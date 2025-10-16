import { Store } from "../../entity/store";
import { IStoreRepository } from "../../repository/istore-repository";

export class SearchStore {
  constructor(private readonly storeRepo: IStoreRepository) {}

  async execute(query: string): Promise<Store[]> {
    const stores = await this.storeRepo.getStoresBySimilarName(query);
    return stores;
  }
}
