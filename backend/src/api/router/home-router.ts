import { Router } from "express";
import { HomeController } from "../controller/HomeController";
import { ProductRepository } from "../../infrastructure/repository/ProductRepository";

export const homeRouter = Router();
const homeController = new HomeController(new ProductRepository());

homeRouter.get(
  "/search",
  homeController.getSearchedProducts.bind(homeController)
);

homeRouter.get(
  "/:productCategory",
  homeController.getCategoryProducts.bind(homeController)
);

homeRouter.get("/", homeController.getTrendingProducts.bind(homeController));
