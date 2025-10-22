import {IProductRepository} from "../../../domain/repository/IProductRepository";
import {Product, ProductCreate} from "../../../domain/entity/product";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {ForbiddenError} from "../../../domain/error/ForbiddenError";

export class DeleteProductDetailsUsecase {
    constructor(private readonly productRepo: IProductRepository) {
    }

    async execute(productUid: string, userUid: string): Promise<Product> {
        const product = await this.productRepo.getProduct(productUid);
        if (!product) {
            throw new NotFoundError("Product not found");
        }

        if (product.seller_uid !== userUid) {
            throw new ForbiddenError("You are not authorized to delete this product. Only seller can delete their product");
        }

        const deletedProduct = await this.productRepo.deleteProduct(productUid);
        if (!deletedProduct) {
            throw new NotFoundError("Product not found");
        }

        return deletedProduct
    }

}