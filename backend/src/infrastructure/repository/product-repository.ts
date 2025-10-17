import {
  ProductCreate,
  Product,
  ProductUpdate,
} from "../../domain/entity/product";
import { IProductRepository } from "../../domain/repository/iproduct-repository";
import { MainBaseRepository } from "./main-base-repository";

const PRODUCT_TABLE = "products";

export class ProductRepository
  extends MainBaseRepository<Product>
  implements IProductRepository
{
  constructor() {
    super(PRODUCT_TABLE);
  }

  createProduct(productData: ProductCreate): Promise<Product> {
    return super.create(productData);
  }

  getProductByUid(uid: string): Promise<Product | null> {
    return super.findBy("uid", uid);
  }

  async updateProduct(
    uid: string,
    updates: ProductUpdate
  ): Promise<Product | null> {
    return super.updateOne("uid", uid, updates);
  }

  async deleteProduct(uid: string): Promise<Product | null> {
    return super.deleteOne("uid", uid);
  }

  async getProductsByName(name: string): Promise<Product[]> {
    return super.searchBy("name", name);
  }

  getProductsByCategories(categories: string[]): Promise<Product[]> {
    return super.findManyByIn("category", categories);
  }
}
