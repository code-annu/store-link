import { UserRole } from "../../entity/auth-user";
import { Store, StoreCreate } from "../../entity/store";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IStoreRepository } from "../../repository/istore-repository";
import { IUserRepository } from "../../repository/iuser-repository";

export class CreateNewStore {
  constructor(
    private readonly storeRepo: IStoreRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(sellerUid: string, storeData: StoreCreate): Promise<Store> {
    const user = await this.userRepo.getUserByUid(sellerUid);
    if (user == null) {
      throw new CustomError(
        "User not found! Account may be deleted",
        ErrorType.NOT_FOUND
      );
    }
    if (user.role != UserRole.SELLER) {
      throw new CustomError(
        "You need to create profile as a seller to create a store",
        ErrorType.FORBIDDEN
      );
    }
    const store = await this.storeRepo.createStore({
      ...storeData,
      owner_uid: sellerUid,
    });

    return store;
  }
}
