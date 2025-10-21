import {Store, StoreCreate, StoreUpdate} from "../entity/store";

export interface IStoreRepository {
    createStore(storeCreate: StoreCreate): Promise<Store>

    getStore(storeUid: string): Promise<Store | null>

    deleteStore(storeUid: string): Promise<Store | null>

    updateStore(storeUid: string, updates: StoreUpdate): Promise<Store | null>

}