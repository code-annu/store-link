import { Response, NextFunction } from "express";
import { CreateBuyerProfileUsecase } from "../../application/usecase/buyer/CreateBuyerProfileUsecase";
import { GetBuyerProfileUsecase } from "../../application/usecase/buyer/GetBuyerProfileUsecase";
import { UpdateBuyerProfileUsecase } from "../../application/usecase/buyer/UpdateBuyerProfileUsecase";
import { DeleteBuyerProfileUsecase } from "../../application/usecase/buyer/DeleteBuyerProfileUsecase";
import { IBuyerRepository } from "../../domain/repository/IBuyerRepository";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { AuthRequest } from "../middleware/validate-authorization";

export class BuyerController {
  private readonly createBuyerProfile: CreateBuyerProfileUsecase;
  private readonly getBuyerProfile: GetBuyerProfileUsecase;
  private readonly updateBuyerProfile: UpdateBuyerProfileUsecase;
  private readonly deleteBuyerProfile: DeleteBuyerProfileUsecase;

  constructor(buyerRepo: IBuyerRepository, userRepo: IUserRepository) {
    this.createBuyerProfile = new CreateBuyerProfileUsecase(
      buyerRepo,
      userRepo
    );
    this.getBuyerProfile = new GetBuyerProfileUsecase(buyerRepo);
    this.deleteBuyerProfile = new DeleteBuyerProfileUsecase(buyerRepo);
    this.updateBuyerProfile = new UpdateBuyerProfileUsecase(buyerRepo);
  }

  async postBuyer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { fullname, address, profile_picture_url } = req.body;

      const result = await this.createBuyerProfile.execute({
        uid: userUid!,
        fullname: fullname,
        address: address,
        profile_picture_url: profile_picture_url,
        has_subscription: false,
      });
      res.status(201).json(result);
    } catch (error) {
      next(error);
    }
  }

  async getBuyer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const result = await this.getBuyerProfile.execute(userUid!);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async patchBuyer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { fullname, profile_picture_url, has_subscription, address } =
        req.body;
      const result = await this.updateBuyerProfile.execute(userUid!, {
        fullname: fullname,
        profile_picture_url: profile_picture_url,
        has_subscription: has_subscription,
        address: address,
      });
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async deleteBuyer(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const result = await this.deleteBuyerProfile.execute(userUid!);
      res
        .status(200)
        .json({ message: "Buyer deleted successfully", user: result });
    } catch (error) {
      next(error);
    }
  }
}
