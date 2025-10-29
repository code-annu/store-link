import { Request, Response, NextFunction } from "express";
import { CreateNewStoreUsecase } from "../../application/usecase/store/CreateNewStoreUsecase";
import { GetStoreDetailsUsecase } from "../../application/usecase/store/GetStoreDetailsUsecase";
import { UpdateStoreDetailsUsecase } from "../../application/usecase/store/UpdateStoreDetailsUsecase";
import { DeleteStoreUsecase } from "../../application/usecase/store/DeleteStoreUsecase";
import { IStoreRepository } from "../../domain/repository/IStoreRepository";
import { AuthRequest } from "../middleware/validate-authorization";
import { ISellerRepository } from "../../domain/repository/ISellerRepository";

export class StoreController {
  private readonly createStore: CreateNewStoreUsecase;
  private readonly getStoreDetails: GetStoreDetailsUsecase;
  private readonly updateStoreDetails: UpdateStoreDetailsUsecase;
  private readonly deleteStoreDetails: DeleteStoreUsecase;

  constructor(storeRepo: IStoreRepository, sellerRepo: ISellerRepository) {
    this.createStore = new CreateNewStoreUsecase(storeRepo, sellerRepo);
    this.getStoreDetails = new GetStoreDetailsUsecase(storeRepo);
    this.updateStoreDetails = new UpdateStoreDetailsUsecase(storeRepo);
    this.deleteStoreDetails = new DeleteStoreUsecase(storeRepo);
  }

  async postStore(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { name, image_url, description, address } = req.body;

      const response = await this.createStore.execute({
        name: name,
        image_url: image_url,
        description: description,
        address,
        owner_uid: userUid!,
      });
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getStore(req: Request, res: Response, next: NextFunction) {
    try {
      const { storeUid } = req.params;
      const response = await this.getStoreDetails.execute(storeUid);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async patchStore(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { storeUid } = req.params;
      const userUid = req.auth?.userId;
      const { name, image_url, description, address } = req.body;
      const response = await this.updateStoreDetails.execute(
        storeUid,
        userUid!,
        {
          name: name,
          image_url: image_url,
          description: description,
          address: address,
        }
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteStore(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const { storeUid } = req.params;
      const userUid = req.auth?.userId;
      const response = await this.deleteStoreDetails.execute(
        storeUid,
        userUid!
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
