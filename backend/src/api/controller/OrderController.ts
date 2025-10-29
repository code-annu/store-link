import { Response, NextFunction } from "express";
import { CreateNewOrderUsecase } from "../../application/usecase/order/CreateNewOrderUsecase";
import { GetOrderDetailsUsecase } from "../../application/usecase/order/GetOrderDetailsUsecase";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { IProductRepository } from "../../domain/repository/IProductRepository";
import { IBuyerRepository } from "../../domain/repository/IBuyerRepository";
import { AuthRequest } from "../middleware/validate-authorization";
import { ClaimOrderForDeliveryUsecase } from "../../application/usecase/order/ClaimOrderForDeliveryUsecase";
import { IDeliveryPartnerRepository } from "../../domain/repository/IDeliveryPartnerRepository";
import { UpdateOrderStatusUsecase } from "../../application/usecase/order/UpdateOrderStatusUsecase";

export class OrderController {
  private readonly createNewOrder: CreateNewOrderUsecase;
  private readonly getOrderDetails: GetOrderDetailsUsecase;
  private readonly claimOrderForDelivery: ClaimOrderForDeliveryUsecase;
  private readonly updateOrderStatus: UpdateOrderStatusUsecase;

  constructor(
    orderRepo: IOrderRepository,
    productRepo: IProductRepository,
    buyerRepo: IBuyerRepository,
    deliveryPartnerRepo: IDeliveryPartnerRepository
  ) {
    this.createNewOrder = new CreateNewOrderUsecase(
      orderRepo,
      buyerRepo,
      productRepo
    );
    this.getOrderDetails = new GetOrderDetailsUsecase(orderRepo);
    this.claimOrderForDelivery = new ClaimOrderForDeliveryUsecase(
      orderRepo,
      deliveryPartnerRepo
    );

    this.updateOrderStatus = new UpdateOrderStatusUsecase(
      orderRepo,
      productRepo
    );
  }

  async createOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { product_uid } = req.body;
      const response = await this.createNewOrder.execute(product_uid, userUid!);
      res.status(201).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { orderUid } = req.params;
      const response = await this.getOrderDetails.execute(orderUid, userUid!);
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async claimOrder(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { orderUid } = req.params;

      const response = await this.claimOrderForDelivery.execute(
        orderUid,
        userUid!
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async patchOrderStatus(req: AuthRequest, res: Response, next: NextFunction) {
    try {
      const userUid = req.auth?.userId;
      const { orderUid } = req.params;
      const { status } = req.body;
      const response = await this.updateOrderStatus.execute(
        orderUid,
        status,
        userUid!
      );

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
