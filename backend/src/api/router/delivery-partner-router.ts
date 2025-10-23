import { Router } from "express";
import { DeliveryPartnerController } from "../controller/DeliveryPartnerController";
import { DeliveryPartnerRepository } from "../../infrastructure/repository/DeliveryPartnerRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  DeliveryPartnerCreateSchema,
  DeliveryPartnerUpdateSchema,
} from "../schema/delivery-partner-schema";

export const deliveryPartnerRouter = Router();
const deliveryPartnerController = new DeliveryPartnerController(
  new DeliveryPartnerRepository(),
  new UserRepository()
);

deliveryPartnerRouter.post(
  "/",
  validateRequestBody(DeliveryPartnerCreateSchema),
  deliveryPartnerController.postDeliveryPartner.bind(deliveryPartnerController)
);
deliveryPartnerRouter.get(
  "/",
  deliveryPartnerController.getDeliveryPartner.bind(deliveryPartnerController)
);
deliveryPartnerRouter.patch(
  "/",
  validateRequestBody(DeliveryPartnerUpdateSchema),
  deliveryPartnerController.patchDeliveryPartner.bind(deliveryPartnerController)
);
deliveryPartnerRouter.delete(
  "/",
  deliveryPartnerController.deleteDeliveryPartner.bind(
    deliveryPartnerController
  )
);
