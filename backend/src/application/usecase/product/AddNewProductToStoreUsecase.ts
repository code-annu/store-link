import { IProductRepository } from "../../../domain/repository/IProductRepository";
import { Product, ProductCreate } from "../../../domain/entity/product";
import { ISellerRepository } from "../../../domain/repository/ISellerRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IStoreRepository } from "../../../domain/repository/IStoreRepository";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

export class AddNewProductToStoreUsecase {
  constructor(
    private readonly productRepo: IProductRepository,
    private readonly sellerRepo: ISellerRepository,
    private readonly storeRepo: IStoreRepository
  ) {}

  async execute(productCreate: ProductCreate): Promise<Product> {
    const seller = await this.sellerRepo.getSeller(productCreate.seller_uid);
    if (!seller) {
      throw new NotFoundError(
        "Please create a seller account before adding new product"
      );
    }

    const store = await this.storeRepo.getStore(productCreate.store_uid);
    if (!store) {
      throw new NotFoundError(
        "Store not found. Please create a store before adding new product"
      );
    }
    if (store.owner_uid !== seller.uid) {
      throw new ForbiddenError(
        "You are not allowed to add products to this store. Only store owners can add products to their store"
      );
    }

    return await this.productRepo.createProduct(productCreate);
  }
}
