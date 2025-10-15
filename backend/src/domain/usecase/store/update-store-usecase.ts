import { Store, StoreUpdate } from "../../entity/store";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IStoreRepository } from "../../repository/istore-repository";

export class UpdateStore {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(
    sellerUid: string,
    storeUid: string,
    updates: StoreUpdate
  ): Promise<Store> {
    const store = await this.storeRepo.getStoreByUid(storeUid);
    if (store == null) {
      throw new CustomError("Store not found!", ErrorType.NOT_FOUND);
    }

    if (store.owner_uid != sellerUid) {
      throw new CustomError(
        "You are not authorized to update this store. Only  store owner can update store",
        ErrorType.FORBIDDEN
      );
    }

    const updatedStore = await this.storeRepo.updateStoreByUid(
      storeUid,
      updates
    );

    if (updatedStore == null) {
      throw new CustomError(
        "Cannot update store. Something went wrong",
        ErrorType.INTERNAL_SERVER_ERROR
      );
    }
    return updatedStore;
  }
}
