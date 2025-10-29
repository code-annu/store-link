import { NextFunction, Response } from "express";
import { AuthRequest } from "../middleware/validate-authorization";
import { CreateDeliveryPartnerProfileUsecase } from "../../application/usecase/delivery_partner/CreateDeliveryPartnerProfileUsecase";
import { UpdateDeliveryPartnerProfileUsecase } from "../../application/usecase/delivery_partner/UpdateDeliveryPartnerProfileUsecase";
import { GetDeliveryPartnerProfileUsecase } from "../../application/usecase/delivery_partner/GetDeliveryPartnerProfileUsecase";
import { DeleteDeliveryPartnerProfileUsecase } from "../../application/usecase/delivery_partner/DeleteDeliveryPartnerProfileUsecase";
import { IDeliveryPartnerRepository } from "../../domain/repository/IDeliveryPartnerRepository";
import { IUserRepository } from "../../domain/repository/IUserRepository";
import { GetUnclaimedOrdersUsecase } from "../../application/usecase/order/GetUnclaimedOrdersUsecase";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";

export class DeliveryPartnerController {
  private readonly createDeliveryPartnerProfile: CreateDeliveryPartnerProfileUsecase;
  private readonly updateDeliveryPartnerProfile: UpdateDeliveryPartnerProfileUsecase;
  private readonly getDeliveryPartnerProfile: GetDeliveryPartnerProfileUsecase;
  private readonly deleteDeliveryPartnerProfile: DeleteDeliveryPartnerProfileUsecase;
  private readonly getUnclaimedOrders: GetUnclaimedOrdersUsecase;

  constructor(
    deliveryPartnerRepo: IDeliveryPartnerRepository,
    userRepo: IUserRepository,
    orderRepo: IOrderRepository
  ) {
    this.createDeliveryPartnerProfile = new CreateDeliveryPartnerProfileUsecase(
      deliveryPartnerRepo,
      userRepo
    );
    this.updateDeliveryPartnerProfile = new UpdateDeliveryPartnerProfileUsecase(
      deliveryPartnerRepo,
      userRepo
    );
    this.getDeliveryPartnerProfile = new GetDeliveryPartnerProfileUsecase(
      deliveryPartnerRepo
    );
    this.deleteDeliveryPartnerProfile = new DeleteDeliveryPartnerProfileUsecase(
      deliveryPartnerRepo,
      userRepo
    );
    this.getUnclaimedOrders = new GetUnclaimedOrdersUsecase(
      orderRepo,
      deliveryPartnerRepo
    );
  }

  async postDeliveryPartner(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userUid = req.auth?.userId;
      const { fullname, profile_picture_url } = req.body;
      const response = await this.createDeliveryPartnerProfile.execute({
        uid: userUid!,
        fullname: fullname,
        profile_picture_url: profile_picture_url,
        total_deliveries: 0,
      });

      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getDeliveryPartner(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userUid = req.auth?.userId;
      const response = await this.getDeliveryPartnerProfile.execute(userUid!);

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async patchDeliveryPartner(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userUid = req.auth?.userId;
      const { fullname, profile_picture_url, is_active } = req.body;
      const response = await this.updateDeliveryPartnerProfile.execute(
        userUid!,
        {
          fullname: fullname,
          profile_picture_url: profile_picture_url,
          is_active: is_active,
        }
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteDeliveryPartner(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userUid = req.auth?.userId;
      const response = await this.deleteDeliveryPartnerProfile.execute(
        userUid!
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async listUnclaimedOrders(
    req: AuthRequest,
    res: Response,
    next: NextFunction
  ) {
    try {
      const userUid = req.auth?.userId;
      const response = await this.getUnclaimedOrders.execute(userUid!);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
