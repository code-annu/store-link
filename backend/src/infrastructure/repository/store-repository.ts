import { StoreCreate, Store, StoreUpdate } from "../../domain/entity/store";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { IStoreRepository } from "../../domain/repository/istore-repository";
import { BaseRepository } from "./base-repository";

const STORE_TABLE = "stores";

export class StoreRepository
  extends BaseRepository
  implements IStoreRepository
{
  constructor() {
    super(STORE_TABLE);
  }

  async createStore(storeData: StoreCreate): Promise<Store> {
    const { data, error } = await super.insert(storeData);

    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Store;
  }

  async getStoreByUid(uid: string): Promise<Store | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as Store;
  }

  async getStoresByOwnerUid(ownerUid: string): Promise<Store[]> {
    const { data, error } = await super.listByColumn("owner_uid", ownerUid);
    console.log(data, error);
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as Store[];
  }

  async updateStoreByUid(
    uid: string,
    updates: StoreUpdate
  ): Promise<Store | null> {
    const { data, error } = await super.update(uid, updates);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as Store;
  }

  async deleteStoreByUid(uid: string): Promise<Store | null> {
    const { data, error } = await super.delete(uid);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as Store;
  }

  async getStoresByName(name: string): Promise<Store[]> {
    const { data, error } = await super.listILIkeByColumn("name", name);
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as Store[];
  }
}
