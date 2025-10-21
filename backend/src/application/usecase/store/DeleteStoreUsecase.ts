import {IStoreRepository} from "../../../domain/repository/IStoreRepository";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {Store} from "../../../domain/entity/store";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {ForbiddenError} from "../../../domain/error/ForbiddenError";
import {DatabaseError} from "../../../domain/error/DatabaseError";

export class DeleteStoreUsecase {
    constructor(private readonly storeRepository: IStoreRepository) {
    }

    async execute(storeUid: string, userUid: string): Promise<Store> {
        const store = await this.storeRepository.getStore(storeUid);
        if (!store) {
            throw new NotFoundError("Store not found");
        }
        if (store.owner_uid != userUid) {
            throw new ForbiddenError("You don't have permission to perform this action. Only store owner can update/delete the store");
        }
        const deletedStore = await this.storeRepository.deleteStore(storeUid);
        if (!deletedStore) {
            throw new DatabaseError("Store deletion failed")
        }
        return deletedStore
    }
}