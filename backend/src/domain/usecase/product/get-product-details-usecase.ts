import { Product } from "../../entity/product";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IProductRepository } from "../../repository/iproduct-repository";

export class GetProductDetails {
  constructor(
    private readonly productRepo: IProductRepository  ) {}

  async execute(uid: string): Promise<Product> {
    const product = await this.productRepo.getProductByUid(uid);
    if (product == null) {
      throw new CustomError("Product not found", ErrorType.NOT_FOUND);
    }
    return product;
  }
}
