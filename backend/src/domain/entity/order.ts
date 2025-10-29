export enum OrderStatus {
  CONFIRMED = "confirmed", // Order has been confirmed by the buyer.
  SHIPPED = "shipped", // Order is packed and prepared for dispatch by the seller.
  DISPATCHED = "dispatched", // Order is picked from seller by the delivery agent. (Now it's ready to out for delivery)
  OUT_FOR_DELIVERY = "out_for_delivery", // Order is ready for delivery by the agent
  DELIVERED = "delivered", // Order is delivered to buyer by the delivery agent
  CANCELLED = "cancelled", // Order is cancelled
}

export interface Order {
  uid: string;
  seller_uid?: string | null;
  buyer_uid?: string | null;
  store_uid?: string | null;
  delivery_partner_uid?: string | null;
  product_uid?: string | null;
  status: OrderStatus;
  delivery_address: string;
  total_amount: number;
  created_at: string;
  updated_at: string;
}

export interface OrderCreate
  extends Pick<
    Order,
    | "seller_uid"
    | "buyer_uid"
    | "product_uid"
    | "status"
    | "delivery_address"
    | "store_uid"
    | "delivery_partner_uid"
    | "total_amount"
  > {}

export interface OrderUpdate
  extends Partial<
    Pick<Order, "delivery_partner_uid" | "status" | "updated_at">
  > {}
