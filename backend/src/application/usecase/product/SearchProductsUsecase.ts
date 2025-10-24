import { Product } from "../../../domain/entity/product";
import { IProductRepository } from "../../../domain/repository/IProductRepository";

export class SearchProductsUsecase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(query: string): Promise<Product[]> {
    return this.productRepo.searchProducts(query);
  }
}
