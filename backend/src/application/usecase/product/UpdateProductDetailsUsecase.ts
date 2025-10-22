import {IProductRepository} from "../../../domain/repository/IProductRepository";
import {Product, ProductUpdate} from "../../../domain/entity/product";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {ForbiddenError} from "../../../domain/error/ForbiddenError";

export class UpdateProductDetailsUsecase {
    constructor(private readonly productRepo: IProductRepository) {
    }

    async execute(productUid: string, updates: ProductUpdate, userUid: string): Promise<Product> {
        const product = await this.productRepo.getProduct(productUid);
        if (!product) {
            throw new NotFoundError("Product not found");
        }

        if (userUid !== product.seller_uid) {
            throw new ForbiddenError("You are authorized to update this product. Only seller can update their product")
        }

        const updatedProduct = await this.productRepo.updateProduct(productUid, updates);
        if (!updatedProduct) {
            throw new NotFoundError("Unable to update the product");
        }

        return updatedProduct
    }

}