import { Router } from "express";
import { StoreController } from "../controller/store-controller";
import { StoreRepository } from "../../infrastructure/repository/store-repository";
import { UserRepository } from "../../infrastructure/repository/user-repository";
import { validateAuthorization } from "../middleware/auth-middleware";
import { validateRequestBody } from "../middleware/validate-request-body";
import { StoreCreateSchema, StoreUpdateSchema } from "../schema/store-schema";

export const storeRouter = Router({ mergeParams: true });

const storeController = new StoreController(
  new StoreRepository(),
  new UserRepository()
);

storeRouter.post(
  "/",
  validateAuthorization,
  validateRequestBody(StoreCreateSchema),
  storeController.postStore.bind(storeController)
);

storeRouter.patch(
  "/:storeUid",
  validateAuthorization,
  validateRequestBody(StoreUpdateSchema),
  storeController.patchStore.bind(storeController)
);

storeRouter.delete(
  "/:storeUid",
  validateAuthorization,
  storeController.deleteStore.bind(storeController)
);

storeRouter.get("/:storeUid", storeController.getStore.bind(storeController));

storeRouter.get("/", storeController.searchStore.bind(storeController));
