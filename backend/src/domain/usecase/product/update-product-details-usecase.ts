import { Product, ProductUpdate } from "../../entity/product";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IProductRepository } from "../../repository/iproduct-repository";

export class UpdateProductDetails {
  constructor(
    private readonly productRepo: IProductRepository  ) {}

  async execute(
    productUid: string,
    sellerUid: string,
    updates: ProductUpdate
  ): Promise<Product> {
    const product = await this.productRepo.getProductByUid(productUid);
    if (product == null) {
      throw new CustomError("Product not found!", ErrorType.NOT_FOUND);
    }
    if (product.seller_uid != sellerUid) {
      throw new CustomError(
        "Only product seller can update the product details",
        ErrorType.FORBIDDEN
      );
    }

    const updatedProduct = await this.productRepo.updateProduct(
      productUid,
      updates
    );
    if (updatedProduct == null) {
      throw new CustomError("Unable to find product", ErrorType.NOT_FOUND);
    }
    return updatedProduct;
  }
}
