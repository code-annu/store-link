import { Product } from "../../entity/product";
import { IProductRepository } from "../../repository/iproduct-repository";

export class SearchProduct {
  constructor(private readonly productRepo: IProductRepository) {}

  async execute(query: string): Promise<Product[]> {
    const products = await this.productRepo.getProductsByName(query);
    return products;
  }
}
