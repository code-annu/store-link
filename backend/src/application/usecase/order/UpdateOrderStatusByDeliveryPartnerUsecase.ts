import { Order, OrderStatus } from "../../../domain/entity/order";
import { ConflictError } from "../../../domain/error/ConflictError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";
import { IProductRepository } from "../../../domain/repository/IProductRepository";

export class UpdateOrderStatusByDeliveryPartnerUsecase {
  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly productRepo: IProductRepository
  ) {}

  async execute(
    orderUid: string,
    status: OrderStatus,
    deliveryPartner: string
  ): Promise<Order> {
    const order = await this.orderRepo.getOrderByUid(orderUid);
    if (!order) throw new NotFoundError("Order not found!");

    if (order.delivery_partner_uid !== deliveryPartner) {
      throw new ForbiddenError("You are not authorized to update this order");
    }

    if (
      status !== OrderStatus.DISPATCHED &&
      status !== OrderStatus.OUT_FOR_DELIVERY &&
      status !== OrderStatus.DELIVERED
    ) {
      throw new ForbiddenError(
        `You cannot update order status to ${status} with delivery partner role.`
      );
    }
    const updatedOrder = await this.orderRepo.updateOrder(orderUid, {
      status: status,
      updated_at: new Date().toISOString(),
    });
    if (!updatedOrder) {
      throw new ConflictError("Failed to update order status");
    }

    if (status === OrderStatus.DELIVERED && updatedOrder.product_uid != null) {
      await this.productRepo.updateProduct(updatedOrder.product_uid, {
        sold_out: true,
      });
    }

    return updatedOrder;
  }
}
