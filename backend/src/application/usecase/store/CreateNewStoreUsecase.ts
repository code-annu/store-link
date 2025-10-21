import {IStoreRepository} from "../../../domain/repository/IStoreRepository";
import {Store, StoreCreate} from "../../../domain/entity/store";
import {ForbiddenError} from "../../../domain/error/ForbiddenError";
import {ISellerRepository} from "../../../domain/repository/ISellerRepository";

export class CreateNewStoreUsecase {
    constructor(private readonly storeRepository: IStoreRepository, private readonly sellerRepo: ISellerRepository) {
    }

    async execute(storeCreate: StoreCreate): Promise<Store> {
        const seller = await this.sellerRepo.getSeller(storeCreate.owner_uid)
        if (!seller) {
            throw new ForbiddenError("You need to create a seller profile before creating a store")
        }
        return await this.storeRepository.createStore(storeCreate)
    }
}