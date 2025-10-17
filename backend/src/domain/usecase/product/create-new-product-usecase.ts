import { Product, ProductCreate } from "../../entity/product";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IProductRepository } from "../../repository/iproduct-repository";
import { ISellerRepository } from "../../repository/iseller-repository";
import { IStoreRepository } from "../../repository/istore-repository";

export class CreateNewProduct {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly sellerRepo: ISellerRepository,
    private readonly storeRepo: IStoreRepository
  ) {}

  async execute(
    productData: ProductCreate,
    sellerUid: string
  ): Promise<Product> {
    const seller = await this.sellerRepo.getSellerByUid(sellerUid);
    if (seller == null) {
      throw new CustomError("Seller not found!", ErrorType.NOT_FOUND);
    }

    const store = await this.storeRepo.getStoreByUid(productData.store_uid);
    if (store == null) {
      throw new CustomError("Store not found!", ErrorType.NOT_FOUND);
    }

    const product = await this.productRepo.createProduct({
      ...productData,
      seller_uid: sellerUid,
      sold_out: false,
      is_available: true,
    });
    return product;
  }
}
