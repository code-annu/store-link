import { Product } from "../../../domain/entity/product";
import { IProductRepository } from "../../../domain/repository/IProductRepository";

export class GetListOfTrendingProductsUsecase {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepo.getListOfRandomProducts();
  }
}
