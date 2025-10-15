import { Store } from "../../entity/store";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IStoreRepository } from "../../repository/istore-repository";

export class DeleteStore {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(sellerUid: string, storeUid: string): Promise<string> {
    const store = await this.storeRepo.getStoreByUid(storeUid);
    if (store == null) {
      throw new CustomError("Store not found!", ErrorType.NOT_FOUND);
    }
    if (sellerUid !== store.owner_uid) {
      throw new CustomError(
        "You are not authorized to delete this store. Only store owner can delete the store",
        ErrorType.FORBIDDEN
      );
    }

    const deletedStore = await this.storeRepo.deleteStoreByUid(storeUid);
    return "Store deleted successfully";
  }
}
