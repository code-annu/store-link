import {Request, Response, NextFunction} from "express";
import {CreateNewProductUsecase} from "../../application/usecase/product/CreateNewProductUsecase";
import {GetProductDetailsUsecase} from "../../application/usecase/product/GetProductDetailsUsecase";
import {UpdateProductDetailsUsecase} from "../../application/usecase/product/UpdateProductDetailsUsecase";
import {DeleteProductDetailsUsecase} from "../../application/usecase/product/DeleteProductDetailsUsecase";
import {IProductRepository} from "../../domain/repository/IProductRepository";
import {ISellerRepository} from "../../domain/repository/ISellerRepository";
import {IStoreRepository} from "../../domain/repository/IStoreRepository";
import {AuthRequest} from "../middleware/validate-authorization";

export class ProductController {
    private readonly createNewProduct: CreateNewProductUsecase
    private readonly getProductDetails: GetProductDetailsUsecase
    private readonly updateProductDetails: UpdateProductDetailsUsecase
    private readonly deleteProductDetails: DeleteProductDetailsUsecase
    

    constructor(productRepo: IProductRepository, sellerRepo: ISellerRepository, storeRepo: IStoreRepository) {
        this.createNewProduct = new CreateNewProductUsecase(productRepo, sellerRepo, storeRepo);
        this.getProductDetails = new GetProductDetailsUsecase(productRepo)
        this.updateProductDetails = new UpdateProductDetailsUsecase(productRepo)
        this.deleteProductDetails = new DeleteProductDetailsUsecase(productRepo)
    }

    async postProduct(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userUid = req.auth?.userId
            const {category, name, image_url, description, price, store_uid} = req.body
            const response = await this.createNewProduct.execute({
                category: category,
                description: description,
                image_url: image_url,
                is_available: true,
                name: name,
                price: price,
                seller_uid: userUid!,
                sold_out: false,
                store_uid: store_uid
            })

            res.status(201).json(response)
        } catch (error) {
            next(error)
        }
    }

    async getProduct(req: Request, res: Response, next: NextFunction) {
        try {
            const {productUid} = req.params
            const response = await this.getProductDetails.execute(productUid)
            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async patchProduct(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userUid = req.auth?.userId
            const {category, name, image_url, description, price, store_uid} = req.body
            const {productUid} = req.params
            const response = await this.updateProductDetails.execute(productUid, {
                category: category,
                description: description,
                image_url: image_url,
                is_available: true,
                name: name,
                price: price,
                seller_uid: userUid!,
                sold_out: false,
                store_uid: store_uid
            }, userUid!)

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

    async deleteProduct(req: AuthRequest, res: Response, next: NextFunction) {
        try {
            const userUid = req.auth?.userId
            const {productUid} = req.params
            const response = await this.deleteProductDetails.execute(productUid, userUid!)

            res.status(200).json(response)
        } catch (error) {
            next(error)
        }
    }

}