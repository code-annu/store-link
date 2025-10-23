import { Order, OrderStatus } from "../../../domain/entity/order";
import { ConflictError } from "../../../domain/error/ConflictError";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { IOrderRepository } from "../../../domain/repository/IOrderRepository";
import { IProductRepository } from "../../../domain/repository/IProductRepository";
import { validateOrderStatus } from "../../../util/order-util";

export class UpdateOrderStatusUsecase {
  private sellerStatusList = [OrderStatus.SHIPPED];
  private deliveryPartnerStatusList = [
    OrderStatus.DISPATCHED,
    OrderStatus.OUT_FOR_DELIVERY,
    OrderStatus.DELIVERED,
  ];

  constructor(
    private readonly orderRepo: IOrderRepository,
    private readonly productRepo: IProductRepository
  ) {}

  async execute(
    orderUid: string,
    status: OrderStatus,
    userUid: string
  ): Promise<Order> {
    const order = await this.orderRepo.getOrderByUid(orderUid);
    if (!order) throw new NotFoundError("Order not found!");

    if (
      order.buyer_uid !== userUid &&
      order.seller_uid !== userUid &&
      order.delivery_partner_uid !== userUid
    ) {
      throw new ForbiddenError("You are not authorized to update this order");
    }

    validateOrderStatus(order.status, status);

    if (
      this.sellerStatusList.includes(status) &&
      order.seller_uid !== userUid
    ) {
      throw new ForbiddenError(
        `You are not authorized to update this order status to ${status}.`
      );
    }

    if (
      this.deliveryPartnerStatusList.includes(status) &&
      order.delivery_partner_uid !== userUid
    ) {
      throw new ForbiddenError(
        `You are not authorized to update this order status to ${status}.`
      );
    }

    const updatedOrder = await this.orderRepo.updateOrder(orderUid, {
      status: status,
      updated_at: new Date().toISOString(),
    });
    if (!updatedOrder) {
      throw new ConflictError("Failed to update order status");
    }

    if (status === OrderStatus.CANCELLED) {
      await this.productRepo.updateProduct(updatedOrder.product_uid!, {
        is_available: true,
        sold_out: false,
      });
    }

    if (status === OrderStatus.DELIVERED) {
      await this.productRepo.updateProduct(updatedOrder.product_uid!, {
        sold_out: true,
      });
    }

    return updatedOrder;
  }
}
