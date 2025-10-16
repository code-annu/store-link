import { Product, ProductCreate } from "../../entity/product";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IProductRepository } from "../../repository/iproduct-repository";
import { ISellerRepository } from "../../repository/iseller-repository";
import { IStoreRepository } from "../../repository/istore-repository";

export class GetProductDetails {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly sellerRepo: ISellerRepository,
    private readonly storeRepo: IStoreRepository
  ) {}

  async execute(uid: string): Promise<Product> {
    const product = await this.productRepo.getProductByUid(uid);
    if (product == null) {
      throw new CustomError("Product not found", ErrorType.NOT_FOUND);
    }
    return product;
  }
}
