import { Store } from "../../entity/store";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IStoreRepository } from "../../repository/istore-repository";
import { IUserRepository } from "../../repository/iuser-repository";

export class GetStoresOfOwner {
  constructor(
    private readonly storeRepo: IStoreRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(ownerUid: string): Promise<Store[]> {
    const user = await this.userRepo.getUserByUid(ownerUid);
    if (user == null) {
      throw new CustomError(
        "User not found! Account may be deleted",
        ErrorType.NOT_FOUND
      );
    }

    return await this.storeRepo.getStoresByOwnerUid(ownerUid);
  }
}
