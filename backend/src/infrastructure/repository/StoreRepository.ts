import {BaseRepository} from "./BaseRepository";
import {Store, StoreCreate, StoreUpdate} from "../../domain/entity/store";
import {IStoreRepository} from "../../domain/repository/IStoreRepository";

const STORE_TABLE = 'stores'

export class StoreRepository extends BaseRepository<Store> implements IStoreRepository {
    constructor() {
        super(STORE_TABLE);
    }

    async createStore(storeCreate: StoreCreate): Promise<Store> {
        return super.create(storeCreate);
    }

    async deleteStore(storeUid: string): Promise<Store | null> {
        return super.deleteOne('uid', storeUid);
    }

    async getStore(storeUid: string): Promise<Store | null> {
        return super.findBy("uid", storeUid);
    }

    async updateStore(storeUid: string, updates: StoreUpdate): Promise<Store | null> {
        return super.updateOne('uid', storeUid, updates);
    }


}