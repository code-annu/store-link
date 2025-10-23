import { Router } from "express";
import { SellerController } from "../controller/SellerController";
import { SellerRepository } from "../../infrastructure/repository/SellerRepository";
import { UserRepository } from "../../infrastructure/repository/UserRepository";
import { validateRequestBody } from "../middleware/validate-request-body";
import { validateAuthorization } from "../middleware/validate-authorization";
import {
  SellerCreateSchema,
  SellerUpdateSchema,
} from "../schema/seller-schema";

export const sellerRouter = Router();
const sellerController = new SellerController(
  new SellerRepository(),
  new UserRepository()
);

sellerRouter.post(
  "/",
  validateRequestBody(SellerCreateSchema),
  sellerController.postSeller.bind(sellerController)
);

sellerRouter.get("/", sellerController.getSeller.bind(sellerController));

sellerRouter.patch(
  "/",
  validateRequestBody(SellerUpdateSchema),
  sellerController.patchSeller.bind(sellerController)
);

sellerRouter.delete("/", sellerController.deleteSeller.bind(sellerController));
