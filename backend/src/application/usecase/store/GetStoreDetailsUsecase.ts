import {IStoreRepository} from "../../../domain/repository/IStoreRepository";
import {Store} from "../../../domain/entity/store";
import {NotFoundError} from "../../../domain/error/NotFoundError";

export class GetStoreDetailsUsecase {
    constructor(private readonly storeRepository: IStoreRepository) {
    }

    async execute(storeUid: string): Promise<Store> {
        const store = await this.storeRepository.getStore(storeUid);
        if (!store) {
            throw new NotFoundError("Store not found!");
        }
        return store
    }
}