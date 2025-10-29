import { Order, OrderCreate, OrderUpdate } from "../../domain/entity/order";
import { IOrderRepository } from "../../domain/repository/IOrderRepository";
import { BaseRepository } from "./BaseRepository";

const TABLE_ORDER = "orders";

export class OrderRepository
  extends BaseRepository<Order>
  implements IOrderRepository
{
  constructor() {
    super(TABLE_ORDER);
  }

  async createOrder(orderCreate: OrderCreate): Promise<Order> {
    return super.create(orderCreate);
  }

  async getOrderByUid(orderUid: string): Promise<Order | null> {
    return super.findBy("uid", orderUid);
  }

  async updateOrder(
    orderUid: string,
    updates: OrderUpdate
  ): Promise<Order | null> {
    return super.updateOne("uid", orderUid, updates);
  }

  async deleteOrder(orderUid: string): Promise<Order | null> {
    return super.deleteOne("uid", orderUid);
  }

  getUnclaimedOrders(): Promise<Order[]> {
    return super.findManyNullBy("delivery_partner_uid");
  }
}
