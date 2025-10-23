import { z } from "zod";
import { OrderStatus } from "../../domain/entity/order";

export const OrderCreateSchema = z.object({
  product_uid: z.string().nonempty("product_uid is required"),
});

export const OrderUpdateSchema = z.object({
  status: z.enum(OrderStatus, {
    error: `'status' value should be one of them ${OrderStatus}`,
  }),
});
