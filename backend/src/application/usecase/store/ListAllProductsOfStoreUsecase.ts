import { Product } from "../../../domain/entity/product";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IProductRepository } from "../../../domain/repository/IProductRepository";
import { IStoreRepository } from "../../../domain/repository/IStoreRepository";

export class ListAllProductsOfStoreUsecase {
  constructor(
    private readonly storeRepo: IStoreRepository,
    private readonly productRepo: IProductRepository
  ) {}

  async execute(storeUid: string, userUid: string): Promise<Product[]> {
    const store = await this.storeRepo.getStore(storeUid);
    if (!store) {
      throw new NotFoundError("Store not found");
    }
    if (store.owner_uid !== userUid) {
      throw new ForbiddenError(
        "You are not authorized to visit the products of this store. Only store owner can access all products"
      );
    }
    return this.productRepo.getProductsOfStore(storeUid);
  }
}
