import { Order } from "../../../domain/entity/order";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";

export class GetOrderDetailsUsecase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(orderUid: string, userUid: string): Promise<Order> {
    const order = await this.orderRepo.getOrderByUid(orderUid);
    if (!order) {
      throw new Error(`Order with uid ${orderUid} not found`);
    }
    if (
      order.buyer_uid !== userUid &&
      order.seller_uid !== userUid &&
      order.delivery_partner_uid !== userUid
    ) {
      throw new ForbiddenError(
        "You do not have permission to access this order"
      );
    }

    return order;
  }
}
