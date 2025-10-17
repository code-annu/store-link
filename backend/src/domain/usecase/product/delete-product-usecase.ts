import { Product } from "../../entity/product";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IProductRepository } from "../../repository/iproduct-repository";

export class DeleteProductDetails {
  constructor(
    private readonly productRepo: IProductRepository  ) {}

  async execute(productUid: string, sellerUid: string): Promise<Product> {
    const product = await this.productRepo.getProductByUid(productUid);
    if (product == null) {
      throw new CustomError("Product not found!", ErrorType.NOT_FOUND);
    }
    if (product.seller_uid != sellerUid) {
      throw new CustomError(
        "Only product seller can delete the product details",
        ErrorType.FORBIDDEN
      );
    }

    const updatedProduct = await this.productRepo.deleteProduct(productUid);
    if (updatedProduct == null) {
      throw new CustomError("Unable to find product", ErrorType.NOT_FOUND);
    }
    return updatedProduct;
  }
}
