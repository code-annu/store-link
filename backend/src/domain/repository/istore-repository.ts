import { Store, StoreCreate, StoreUpdate } from "../entity/store";

export interface IStoreRepository {
  createStore(storeData: StoreCreate): Promise<Store>;
  getStoreByUid(uid: string): Promise<Store | null>;
  getStoresByOwnerUid(ownerUid: string): Promise<Store[]>;
  updateStoreByUid(uid: string, updates: StoreUpdate): Promise<Store | null>;
  deleteStoreByUid(uid: string): Promise<Store | null>;
}
