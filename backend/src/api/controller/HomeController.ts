import { Request, Response, NextFunction } from "express";
import { GetListOfTrendingProductsUsecase } from "../../application/usecase/product/GetListOfTrendingProductsUsecase";
import { SearchProductsUsecase } from "../../application/usecase/product/SearchProductsUsecase";
import { GetProductsOfCategoryUsecase } from "../../application/usecase/product/GetProductsOfCategoryUsecase";
import { IProductRepository } from "../../domain/repository/IProductRepository";
import { BadRequestError } from "../../domain/error/BadRequestError";

export class HomeController {
  private readonly getListOfTrendingProducts: GetListOfTrendingProductsUsecase;
  private readonly searchProducts: SearchProductsUsecase;
  private readonly getProductsOfCategory: GetProductsOfCategoryUsecase;

  constructor(productRepo: IProductRepository) {
    this.searchProducts = new SearchProductsUsecase(productRepo);
    this.getListOfTrendingProducts = new GetListOfTrendingProductsUsecase(
      productRepo
    );
    this.getProductsOfCategory = new GetProductsOfCategoryUsecase(productRepo);
  }

  async getTrendingProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const response = await this.getListOfTrendingProducts.execute();
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getCategoryProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { productCategory } = req.params;
      const response = await this.getProductsOfCategory.execute(
        productCategory
      );
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  async getSearchedProducts(req: Request, res: Response, next: NextFunction) {
    try {
      const { query } = req.query;
      if (!query) {
        throw new BadRequestError("Enter a query to search products");
      }
      const response = await this.searchProducts.execute(query.toString());
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}
