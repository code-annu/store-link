import { Router } from "express";
import { StoreController } from "../controller/StoreController";
import { StoreRepository } from "../../infrastructure/repository/StoreRepository";
import { SellerRepository } from "../../infrastructure/repository/SellerRepository";
import { validateRequestBody } from "../middleware/validate-request-body";
import { StoreCreateSchema, StoreUpdateSchema } from "../schema/store-schema";
import { ProductController } from "../controller/ProductController";
import { ProductRepository } from "../../infrastructure/repository/ProductRepository";
import {
  ProductCreateSchema,
  ProductUpdateSchema,
} from "../schema/product-schema";

export const storeRouter = Router();

const storeController = new StoreController(
  new StoreRepository(),
  new SellerRepository()
);
const productController = new ProductController(
  new ProductRepository(),
  new SellerRepository(),
  new StoreRepository()
);

// Store CRUD operations
storeRouter.post(
  "/",
  validateRequestBody(StoreCreateSchema),
  storeController.postStore.bind(storeController)
);

storeRouter.get("/:storeUid", storeController.getStore.bind(storeController));

storeRouter.patch(
  "/:storeUid",
  validateRequestBody(StoreUpdateSchema),
  storeController.patchStore.bind(storeController)
);

storeRouter.delete(
  "/:storeUid",
  storeController.deleteStore.bind(storeController)
);

// Store Products CRUD operations
storeRouter.post(
  "/:storeUid/products",
  validateRequestBody(ProductCreateSchema),
  productController.postProduct.bind(productController)
);

storeRouter.get(
  "/:storeUid/products",
  productController.listProducts.bind(productController)
);

storeRouter.get(
  "/:storeUid/products/:productUid",
  productController.getProduct.bind(productController)
);

storeRouter.patch(
  "/:storeUid/products/:productUid",
  validateRequestBody(ProductUpdateSchema),
  productController.patchProduct.bind(productController)
);

storeRouter.delete(
  "/:storeUid/products/:productUid",
  productController.deleteProduct.bind(productController)
);
