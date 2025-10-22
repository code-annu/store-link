import {IProductRepository} from "../../../domain/repository/IProductRepository";
import {Product, ProductCreate} from "../../../domain/entity/product";
import {NotFoundError} from "../../../domain/error/NotFoundError";

export class GetProductDetailsUsecase {
    constructor(private readonly productRepo: IProductRepository) {
    }

    async execute(productUid: string): Promise<Product> {
        const product = await this.productRepo.getProduct(productUid);
        if (!product) {
            throw new NotFoundError("Product not found")
        }

        return product
    }

}