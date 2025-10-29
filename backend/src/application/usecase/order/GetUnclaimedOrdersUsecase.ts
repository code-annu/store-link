import { Order } from "../../../domain/entity/order";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IDeliveryPartnerRepository } from "../../../domain/repository/IDeliveryPartnerRepository";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";

export class GetUnclaimedOrdersUsecase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly deliveryPartnerRepo: IDeliveryPartnerRepository
  ) {}

  async execute(deliveryPartnerUid: string): Promise<Order[]> {
    const deliveryPartner = await this.deliveryPartnerRepo.getDeliveryPartner(
      deliveryPartnerUid
    );

    if (!deliveryPartner) {
      throw new NotFoundError("Delivery partner profile not found!");
    }

    return this.orderRepo.getUnclaimedOrders();
  }
}
