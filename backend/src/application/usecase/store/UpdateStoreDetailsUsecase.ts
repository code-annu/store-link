import {IStoreRepository} from "../../../domain/repository/IStoreRepository";
import {Store, StoreUpdate} from "../../../domain/entity/store";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {ForbiddenError} from "../../../domain/error/ForbiddenError";
import {DatabaseError} from "../../../domain/error/DatabaseError";

export class UpdateStoreDetailsUsecase {
    constructor(private readonly storeRepository: IStoreRepository) {
    }

    async execute(storeUid: string, userUid: string, updates: StoreUpdate): Promise<Store> {
        const store = await this.storeRepository.getStore(storeUid);
        if (!store) {
            throw new NotFoundError("Store not found");
        }
        if (store.owner_uid != userUid) {
            throw new ForbiddenError("You don't have permission to perform this action. Only store owner can update/delete the store");
        }
        const updatedStore = await this.storeRepository.updateStore(storeUid, updates);
        if (!updatedStore) {
            throw new DatabaseError("Cannot update store");
        }
        return updatedStore
    }
}