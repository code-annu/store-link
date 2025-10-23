import {Order, OrderCreate, OrderUpdate} from "../entity/order";

export interface IOrderRepository {
    createOrder(orderCreate: OrderCreate): Promise<Order>

    getOrderByUid(orderUid: string): Promise<Order | null>

    updateOrder(orderUid: string, updates: OrderUpdate): Promise<Order | null>

    deleteOrder(orderUid: string): Promise<Order | null>
}