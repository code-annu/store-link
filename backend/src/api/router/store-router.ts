import {Router} from "express";
import {StoreController} from "../controller/StoreController";
import {StoreRepository} from "../../infrastructure/repository/StoreRepository";
import {SellerRepository} from "../../infrastructure/repository/SellerRepository";
import {validateRequestBody} from "../middleware/validate-request-body";
import {validateAuthorization} from "../middleware/validate-authorization";
import {StoreCreateSchema, StoreUpdateSchema} from "../schema/store-schema";

export const storeRouter = Router();

const storeController = new StoreController(new StoreRepository(), new SellerRepository());

storeRouter.post(
    '/',
    validateAuthorization,
    validateRequestBody(StoreCreateSchema),
    storeController.postStore.bind(storeController)
);

storeRouter.get(
    '/:storeUid',
    storeController.getStore.bind(storeController)
);

storeRouter.patch(
    '/:storeUid',
    validateAuthorization,
    validateRequestBody(StoreUpdateSchema),
    storeController.patchStore.bind(storeController)
);

storeRouter.delete(
    '/:storeUid',
    validateAuthorization,
    storeController.deleteStore.bind(storeController)
);
