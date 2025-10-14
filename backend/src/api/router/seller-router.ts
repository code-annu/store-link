import { UserRepository } from "../../infrastructure/repository/user-repository";
import { SellerRepository } from "../../infrastructure/repository/seller-repository";
import { SellerController } from "../controller/seller-controller";
import { Router } from "express";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  SellerCreateSchema,
  SellerUpdateSchema,
} from "../schema/seller-schema";

export const sellerRouter = Router();
const sellerController = new SellerController(
  new UserRepository(),
  new SellerRepository()
);

sellerRouter.post(
  "/",
  validateRequestBody(SellerCreateSchema),
  sellerController.postSellerProfile.bind(sellerController)
);

sellerRouter.get("/", sellerController.getSeller.bind(sellerController));

sellerRouter.patch(
  "/verify",
  sellerController.patchVerifySellerProfile.bind(sellerController)
);

sellerRouter.patch(
  "/",
  validateRequestBody(SellerUpdateSchema),
  sellerController.patchSellerProfile.bind(sellerController)
);

sellerRouter.delete("/", sellerController.deleteProfile.bind(sellerController));
