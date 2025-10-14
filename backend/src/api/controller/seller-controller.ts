import { Request, Response } from "express";
import { CreateSellerProfile } from "../../domain/usecase/seller/create-seller-profile-uscase";
import { VerifySellerProfile } from "../../domain/usecase/seller/verify-seller-profile-usecase";
import { UpdateSellerProfile } from "../../domain/usecase/seller/update-seller-profile-usecase";
import { DeleteSellerProfile } from "../../domain/usecase/seller/delete-seller-profile-usecase";
import { GetSellerProfile } from "../../domain/usecase/seller/get-seller-profile-usecase";
import { IUserRepository } from "../../domain/repository/iuser-repository";
import { ISellerRepository } from "../../domain/repository/iseller-repository";
import { AuthRequest } from "../middleware/auth-middleware";
import { CustomError } from "../../domain/error/custom-error";

export class SellerController {
  private createSellerProfile: CreateSellerProfile;
  private verifySellerProfile: VerifySellerProfile;
  private updateSellerProfile: UpdateSellerProfile;
  private deleteSellerProfile: DeleteSellerProfile;
  private getSellerProfile: GetSellerProfile;

  constructor(userRepo: IUserRepository, sellerRepo: ISellerRepository) {
    this.createSellerProfile = new CreateSellerProfile(sellerRepo, userRepo);
    this.verifySellerProfile = new VerifySellerProfile(sellerRepo, userRepo);
    this.updateSellerProfile = new UpdateSellerProfile(sellerRepo, userRepo);
    this.deleteSellerProfile = new DeleteSellerProfile(userRepo);
    this.getSellerProfile = new GetSellerProfile(sellerRepo,userRepo);
  }

  async postSellerProfile(req: AuthRequest, res: Response) {
    try {
      const data = req.body;
      const sellerUid = req.auth?.userId;
      const sellerProfile = await this.createSellerProfile.execute(
        sellerUid!!,
        data
      );
      res.status(201).json(sellerProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async getSeller(req: AuthRequest, res: Response) {
    try {
      const sellerUid = req.auth?.userId;
      const sellerProfile = await this.getSellerProfile.execute(sellerUid!!);
      res.status(200).json(sellerProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async patchVerifySellerProfile(req: AuthRequest, res: Response) {
    try {
      const sellerUid = req.auth?.userId;
      const sellerProfile = await this.verifySellerProfile.execute(sellerUid!!);
      res.status(200).json(sellerProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async patchSellerProfile(req: AuthRequest, res: Response) {
    try {
      const updates = req.body;
      const sellerUid = req.auth?.userId;
      const sellerProfile = await this.updateSellerProfile.execute(
        sellerUid!!,
        updates
      );
      res.status(200).json(sellerProfile);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async deleteProfile(req: AuthRequest, res: Response) {
    try {
      const sellerUid = req.auth?.userId;
      const message = await this.deleteSellerProfile.execute(sellerUid!!);
      res.status(200).json(message);
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }
}
