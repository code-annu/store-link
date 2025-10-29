import { Router } from "express";
import { OrderController } from "../controller/OrderController";
import { OrderRepository } from "../../infrastructure/repository/OrderRepository";
import { ProductRepository } from "../../infrastructure/repository/ProductRepository";
import { BuyerRepository } from "../../infrastructure/repository/BuyerRepository";
import { validateRequestBody } from "../middleware/validate-request-body";
import { OrderCreateSchema, OrderUpdateSchema } from "../schema/order-schema";
import { DeliveryPartnerRepository } from "../../infrastructure/repository/DeliveryPartnerRepository";
import { validateAuthorization } from "../middleware/validate-authorization";

export const orderRouter = Router();

const orderController = new OrderController(
  new OrderRepository(),
  new ProductRepository(),
  new BuyerRepository(),
  new DeliveryPartnerRepository()
);

orderRouter.post(
  "/",
  validateRequestBody(OrderCreateSchema),
  orderController.createOrder.bind(orderController)
);

orderRouter.get(
  "/unclaimed",
  validateAuthorization,
  orderController.getUnclaimedOrders.bind(orderController)
);

orderRouter.get("/:orderUid", orderController.getOrder.bind(orderController));

orderRouter.patch(
  "/:orderUid/claim",
  orderController.claimOrder.bind(orderController)
);

orderRouter.patch(
  "/:orderUid/status",
  validateRequestBody(OrderUpdateSchema),
  orderController.patchOrderStatus.bind(orderController)
);
