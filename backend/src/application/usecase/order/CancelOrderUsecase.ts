import { Order, OrderStatus } from "../../../domain/entity/order";
import { ConflictError } from "../../../domain/error/ConflictError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";
import { IProductRepository } from "../../../domain/repository/IProductRepository";

export class CancelOrderUsecase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly productRepo: IProductRepository
  ) {}

  async execute(orderUid: string, userUid: string): Promise<Order> {
    const order = await this.orderRepo.getOrderByUid(orderUid);
    if (!order) throw new NotFoundError("Order not found!");

    if (
      order.buyer_uid !== userUid &&
      order.seller_uid !== userUid &&
      order.delivery_partner_uid !== userUid
    ) {
      throw new ForbiddenError("You are not authorized to cancel this order");
    }

    const updatedOrder = await this.orderRepo.updateOrder(orderUid, {
      status: OrderStatus.CANCELLED,
      updated_at: new Date().toISOString(),
    });
    if (!updatedOrder) {
      throw new ConflictError("Failed to cancel order");
    }

    if (updatedOrder.product_uid != null) {
      await this.productRepo.updateProduct(updatedOrder.product_uid, {
        is_available: true,
      });
    }

    return updatedOrder;
  }
}
