import { Request, Response, NextFunction } from "express";
import { AddNewProductToStoreUsecase } from "../../application/usecase/product/AddNewProductToStoreUsecase";
import { GetProductDetailsUsecase } from "../../application/usecase/product/GetProductDetailsUsecase";
import { UpdateProductDetailsUsecase } from "../../application/usecase/product/UpdateProductDetailsUsecase";
import { DeleteProductDetailsUsecase } from "../../application/usecase/product/DeleteProductDetailsUsecase";
import { IProductRepository } from "../../domain/repository/IProductRepository";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";
import { IStoreRepository } from "../../domain/repository/IStoreRepository";
import { AuthRequest } from "../middleware/validate-authorization";
import { ListAllProductsOfStoreUsecase } from "../../application/usecase/store/ListAllProductsOfStoreUsecase";
import { SearchProductsUsecase } from "../../application/usecase/product/SearchProductsUsecase";
import { BadRequestError } from "../../domain/error/BadRequestError";
import { GetProductsOfCategoryUsecase } from "../../application/usecase/product/GetProductsOfCategoryUsecase";
import { GetListOfTrendingProductsUsecase } from "../../application/usecase/product/GetListOfTrendingProductsUsecase";

export class ProductController {
  private readonly createNewProduct: AddNewProductToStoreUsecase;
  private readonly getProductDetails: GetProductDetailsUsecase;
  private readonly updateProductDetails: UpdateProductDetailsUsecase;
  private readonly deleteProductDetails: DeleteProductDetailsUsecase;
  private readonly listProductsOfStore: ListAllProductsOfStoreUsecase;
  private readonly searchProductsUsecase: SearchProductsUsecase;
  private readonly getProductsOfCategory: GetProductsOfCategoryUsecase;
  private readonly getListOfTrendingProducts: GetListOfTrendingProductsUsecase;

  constructor(
    productRepo: IProductRepository,
    sellerRepo: ISellerRepository,
    storeRepo: IStoreRepository
  ) {
    this.createNewProduct = new AddNewProductToStoreUsecase(
      productRepo,
      sellerRepo,
      storeRepo
    );
    this.getProductDetails = new GetProductDetailsUsecase(productRepo);
    this.updateProductDetails = new UpdateProductDetailsUsecase(productRepo);
    this.deleteProductDetails = new DeleteProductDetailsUsecase(productRepo);
    this.listProductsOfStore = new ListAllProductsOfStoreUsecase(
      storeRepo,
      productRepo
    );
    this.searchProductsUsecase = new SearchProductsUsecase(productRepo);
    this.getProductsOfCategory = new GetProductsOfCategoryUsecase(productRepo);
    this.getListOfTrendingProducts = new GetListOfTrendingProductsUsecase(
      productRepo
    );
  }

  async postProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { category, name, image_url, description, price } = req.body;
      const { storeUid } = req.params;
      const response = await this.createNewProduct.execute({
        category: category,
        description: description,
        image_url: image_url,
        is_available: true,
        name: name,
        price: price,
        seller_uid: userUid!,
        sold_out: false,
        store_uid: storeUid,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getProduct(req: Request, res: Response, next: NextFunction) {
    try {
      const { productUid } = req.params;
      const response = await this.getProductDetails.execute(productUid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async patchProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { category, name, image_url, description, price, store_uid } =
        req.body;
      const { productUid } = req.params;
      const response = await this.updateProductDetails.execute(
        productUid,
        {
          category: category,
          description: description,
          image_url: image_url,
          is_available: true,
          name: name,
          price: price,
          seller_uid: userUid!,
          sold_out: false,
          store_uid: store_uid,
        },
        userUid!
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { productUid } = req.params;
      const response = await this.deleteProductDetails.execute(
        productUid,
        userUid!
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async listProducts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { storeUid } = req.params;
      const userUid = req.auth?.userId;
      const response = await this.listProductsOfStore.execute(
        storeUid,
        userUid!
      );
      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async searchProducts(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { query } = req.query;
      if (!query) {
        throw new BadRequestError("Please enter search query for products");
      }
      const response = await this.searchProductsUsecase.execute(
        query.toString()
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { category } = req.params;
      const response = await this.getProductsOfCategory.execute(category);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getTrendingProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.getListOfTrendingProducts.execute();
      console.log(response);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
