import { Product } from "../../../domain/entity/product";
import { IProductRepository } from "../../../domain/repository/IProductRepository";

export class GetProductsOfCategoryUsecase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(category: string): Promise<Product[]> {
    return this.productRepo.getListOfProducts(category);
  }
}
