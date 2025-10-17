import { Router } from "express";
import { ProductController } from "../controller/product-controller";
import { ProductRepository } from "../../infrastructure/repository/product-repository";
import { SellerRepository } from "../../infrastructure/repository/seller-repository";
import { StoreRepository } from "../../infrastructure/repository/store-repository";
import { validateAuthorization } from "../middleware/auth-middleware";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  ProductCreateSchema,
  ProductUpdateSchema,
} from "../schema/product-schema";

export const productRouter = Router({ mergeParams: true });
const productController = new ProductController(
  new ProductRepository(),
  new SellerRepository(),
  new StoreRepository()
);

productRouter.post(
  "/",
  validateAuthorization,
  validateRequestBody(ProductCreateSchema),
  productController.postProduct.bind(productController)
);
productRouter.get(
  "/:productUid",
  productController.getProduct.bind(productController)
);

productRouter.patch(
  "/:productUid",
  validateAuthorization,
  validateRequestBody(ProductUpdateSchema),
  productController.patchProduct.bind(productController)
);

productRouter.delete(
  "/:productUid",
  validateAuthorization,
  validateRequestBody(ProductUpdateSchema),
  productController.deleteProduct.bind(productController)
);

productRouter.get(
  "/",
  productController.searchProducts.bind(productController)
);
