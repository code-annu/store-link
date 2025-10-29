import { Router } from "express";
import { ProductController } from "../controller/ProductController";
import { ProductRepository } from "../../infrastructure/repository/ProductRepository";
import { SellerRepository } from "../../infrastructure/repository/SellerRepository";
import { StoreRepository } from "../../infrastructure/repository/StoreRepository";
import { StoreController } from "../controller/StoreController";

export const productRouter = Router();
const productController = new ProductController(
  new ProductRepository(),
  new SellerRepository(),
  new StoreRepository()
);

productRouter.get(
  "/search",
  productController.searchProducts.bind(productController)
);

productRouter.get(
  "/category/:category",
  productController.getCategoryProducts.bind(productController)
);

productRouter.get(
  "/trending",
  productController.getTrendingProducts.bind(productController)
);

productRouter.get(
  "/:productUid",
  productController.getProduct.bind(productController)
);
