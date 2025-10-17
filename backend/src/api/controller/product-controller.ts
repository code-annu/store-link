import { Request, Response } from "express";
import { CreateNewProduct } from "../../domain/usecase/product/create-new-product-usecase";
import { GetProductDetails } from "../../domain/usecase/product/get-product-details-usecase";
import { UpdateProductDetails } from "../../domain/usecase/product/update-product-details-usecase";
import { DeleteProductDetails } from "../../domain/usecase/product/delete-product-usecase";
import { IProductRepository } from "../../domain/repository/iproduct-repository";
import { ISellerRepository } from "../../domain/repository/iseller-repository";
import { IStoreRepository } from "../../domain/repository/istore-repository";
import { AuthRequest } from "../middleware/auth-middleware";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { SearchProduct } from "../../domain/usecase/product/search-product-usecase";

export class ProductController {
  private readonly createNewProduct: CreateNewProduct;
  private readonly getProductDetails: GetProductDetails;
  private readonly updateProductDetails: UpdateProductDetails;
  private readonly deleteProductDetails: DeleteProductDetails;
  private readonly searchProduct: SearchProduct;

  constructor(
    productRepo: IProductRepository,
    sellerRepo: ISellerRepository,
    storeRepo: IStoreRepository
  ) {
    this.createNewProduct = new CreateNewProduct(
      productRepo,
      sellerRepo,
      storeRepo
    );
    this.getProductDetails = new GetProductDetails(productRepo);
    this.updateProductDetails = new UpdateProductDetails(productRepo);
    this.deleteProductDetails = new DeleteProductDetails(productRepo);
    this.searchProduct = new SearchProduct(productRepo);
  }

  async postProduct(req: AuthRequest, res: Response) {
    try {
      const data = req.body;
      const userUid = req.auth?.userId;
      const product = await this.createNewProduct.execute(data, userUid!);
      res.status(201).json(product);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res
          .status(ErrorType.INTERNAL_SERVER_ERROR)
          .json({ message: (e as Error).message });
      }
    }
  }

  async getProduct(req: Request, res: Response) {
    try {
      const { productUid } = req.params;
      if (productUid == null) {
        throw new CustomError(
          "Product id is required in path parameter",
          ErrorType.BAD_REQUEST
        );
      }
      const product = await this.getProductDetails.execute(productUid);
      res.status(200).json(product);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res
          .status(ErrorType.INTERNAL_SERVER_ERROR)
          .json({ message: (e as Error).message });
      }
    }
  }

  async patchProduct(req: AuthRequest, res: Response) {
    try {
      const { productUid } = req.params;
      const userUid = req.auth?.userId;
      const updates = req.body;
      if (productUid == null) {
        throw new CustomError(
          "Product id is required in path parameter",
          ErrorType.BAD_REQUEST
        );
      }
      const product = await this.updateProductDetails.execute(
        productUid,
        userUid!,
        updates
      );
      res.status(200).json(product);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res
          .status(ErrorType.INTERNAL_SERVER_ERROR)
          .json({ message: (e as Error).message });
      }
    }
  }

  async deleteProduct(req: AuthRequest, res: Response) {
    try {
      const { productUid } = req.params;
      const userUid = req.auth?.userId;
      const updates = req.body;
      if (productUid == null) {
        throw new CustomError(
          "Product id is required in path parameter",
          ErrorType.BAD_REQUEST
        );
      }
      await this.deleteProductDetails.execute(productUid, userUid!);
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res
          .status(ErrorType.INTERNAL_SERVER_ERROR)
          .json({ message: (e as Error).message });
      }
    }
  }

  async searchProducts(req: Request, res: Response) {
    try {
      const { query } = req.query;
      console.log(query)
      if (query == null) {
        throw new CustomError(
          "Product name is required with query",
          ErrorType.BAD_REQUEST
        );
      }
      const products = await this.searchProduct.execute(query.toString());
      res.status(200).json(products);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res
          .status(ErrorType.INTERNAL_SERVER_ERROR)
          .json({ message: (e as Error).message });
      }
    }
  }
}
