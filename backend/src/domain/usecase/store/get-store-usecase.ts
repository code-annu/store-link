import { Store } from "../../entity/store";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IStoreRepository } from "../../repository/istore-repository";

export class GetStore {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(storeUid: string): Promise<Store> {
    const store = await this.storeRepo.getStoreByUid(storeUid);
    if (store == null) {
      throw new CustomError("Store not found!", ErrorType.NOT_FOUND);
    }

    return store;
  }
}
