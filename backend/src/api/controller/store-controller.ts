import { Request, Response } from "express";
import { CreateNewStore } from "../../domain/usecase/store/create-new-store-usecase";
import { GetStoresOfOwner } from "../../domain/usecase/store/get-stores-of-owner-usecase";
import { UpdateStore } from "../../domain/usecase/store/update-store-usecase";
import { GetStore } from "../../domain/usecase/store/get-store-usecase";
import { DeleteStore } from "../../domain/usecase/store/delete-store-usecase";
import { IUserRepository } from "../../domain/repository/iuser-repository";
import { IStoreRepository } from "../../domain/repository/istore-repository";
import { AuthRequest } from "../middleware/auth-middleware";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { SearchStore } from "../../domain/usecase/store/search-store-usecase";

export class StoreController {
  private createStore: CreateNewStore;
  private getOwnerStores: GetStoresOfOwner;
  private updateStore: UpdateStore;
  private getStoreDetails: GetStore;
  private deleteStoreDetails: DeleteStore;
  private searchStores: SearchStore;

  constructor(storeRepo: IStoreRepository, userRepo: IUserRepository) {
    this.createStore = new CreateNewStore(storeRepo, userRepo);
    this.getOwnerStores = new GetStoresOfOwner(storeRepo, userRepo);
    this.updateStore = new UpdateStore(storeRepo);
    this.getStoreDetails = new GetStore(storeRepo);
    this.deleteStoreDetails = new DeleteStore(storeRepo);
    this.searchStores = new SearchStore(storeRepo);
  }

  async postStore(req: AuthRequest, res: Response) {
    try {
      const data = req.body;
      const uid = req.auth?.userId;
      const store = await this.createStore.execute(uid!, data);
      res.status(201).json(store);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async getStore(req: Request, res: Response) {
    try {
      const { storeUid } = req.params;
      if (storeUid == null) {
        throw new CustomError("Store path is required", ErrorType.BAD_REQUEST);
      }
      const store = await this.getStoreDetails.execute(storeUid);
      res.status(200).json(store);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async patchStore(req: AuthRequest, res: Response) {
    try {
      const updates = req.body;
      const uid = req.auth?.userId;
      const { storeUid } = req.params;
      if (storeUid == null) {
        throw new CustomError("Store path is required", ErrorType.BAD_REQUEST);
      }
      const store = await this.updateStore.execute(uid!, storeUid, updates);
      res.status(200).json(store);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async deleteStore(req: AuthRequest, res: Response) {
    try {
      const uid = req.auth?.userId;
      const { storeUid } = req.params;
      if (storeUid == null) {
        throw new CustomError("Store path is required", ErrorType.BAD_REQUEST);
      }
      const store = await this.deleteStoreDetails.execute(uid!, storeUid);
      res.status(200).json(store);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async searchStore(req: AuthRequest, res: Response) {
    try {
      const { query } = req.query;
      if (query == null) {
        throw new CustomError(
          "Store name is required with query",
          ErrorType.BAD_REQUEST
        );
      }
      const stores = await this.searchStores.execute(query.toString());
      res.status(200).json(stores);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }
}
