import { Order } from "../../../domain/entity/order";
import { ConflictError } from "../../../domain/error/ConflictError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IDeliveryPartnerRepository } from "../../../domain/repository/IDeliveryPartnerRepository";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";

export class ClaimOrderForDeliveryUsecase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly deliveryPartnerRepo: IDeliveryPartnerRepository
  ) {}

  async execute(orderUid: string, deliveryPartnerUid: string): Promise<Order> {
    const deliveryPartner = await this.deliveryPartnerRepo.getDeliveryPartner(
      deliveryPartnerUid
    );
    if (!deliveryPartner) {
      throw new NotFoundError("Delivery partner profile not found!");
    }

    const order = await this.orderRepo.getOrderByUid(orderUid);
    if (!order) throw new NotFoundError("Order not found!");

    if (order.delivery_partner_uid !== null) {
      throw new ConflictError(
        "This order is already claimed by another delivery partner"
      );
    }

    const updatedOrder = await this.orderRepo.updateOrder(orderUid, {
      delivery_partner_uid: deliveryPartnerUid,
    });

    if (!updatedOrder)
      throw new ConflictError("Unable to assign delivery partner");

    return updatedOrder;
  }
}
