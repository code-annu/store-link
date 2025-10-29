import { Order } from "../../../domain/entity/order";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IDeliveryPartnerRepository } from "../../../domain/repository/IDeliveryPartnerRepository";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";

export class ListOrdersForMyDeliveriesUsecase {
  constructor(
    private readonly deliveryPartnerRepo: IDeliveryPartnerRepository,
    private readonly orderRepo: IOrderRepository
  ) {}

  async execute(deliveryPartnerUid: string): Promise<Order[]> {
    const deliveryPartner = await this.deliveryPartnerRepo.getDeliveryPartner(
      deliveryPartnerUid
    );

    if (!deliveryPartner) {
      throw new NotFoundError("Delivery partner not found");
    }

    return this.orderRepo.getOrdersForDeliveryPartner(deliveryPartnerUid);
  }
}
