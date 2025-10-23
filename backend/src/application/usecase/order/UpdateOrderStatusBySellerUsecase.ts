import { Order, OrderStatus } from "../../../domain/entity/order";
import { ConflictError } from "../../../domain/error/ConflictError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";

export class UpdateOrderStatusBySellerUsecase {
  constructor(private readonly orderRepo: IOrderRepository) {}

  async execute(orderUid: string, sellerUid: string): Promise<Order> {
    const order = await this.orderRepo.getOrderByUid(orderUid);
    if (!order) throw new NotFoundError("Order not found!");

    if (order.seller_uid !== sellerUid) {
      throw new ForbiddenError("You are not authorized to update this order");
    }

    const updatedOrder = await this.orderRepo.updateOrder(orderUid, {
      status: OrderStatus.SHIPPED,
      updated_at: new Date().toISOString(),
    });
    if (!updatedOrder) {
      throw new ConflictError("Failed to update order status");
    }
    return updatedOrder;
  }
}
