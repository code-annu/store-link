import { BaseRepository } from "./BaseRepository";
import {
  Product,
  ProductCreate,
  ProductUpdate,
} from "../../domain/entity/product";
import { IProductRepository } from "../../domain/repository/IProductRepository";

const PRODUCT_TABLE = "products";

export class ProductRepository
  extends BaseRepository<Product>
  implements IProductRepository
{
  constructor() {
    super(PRODUCT_TABLE);
  }

  async createProduct(productCreate: ProductCreate): Promise<Product> {
    return super.create(productCreate);
  }

  async deleteProduct(productUid: string): Promise<Product | null> {
    return super.deleteOne("uid", productUid);
  }

  async getProduct(productUid: string): Promise<Product | null> {
    return super.findBy("uid", productUid);
  }

  async updateProduct(
    productUid: string,
    updates: ProductUpdate
  ): Promise<Product | null> {
    return super.updateOne("uid", productUid, updates);
  }

  async getListOfRandomProducts(): Promise<Product[]> {
    return super.findManyBy("is_available", true);
  }

  async searchProducts(query: string): Promise<Product[]> {
    return super.searchBy("name", query);
  }

  async getListOfProducts(category: string): Promise<Product[]> {
    return super.findManyBy("category", category);
  }

  async getProductsOfStore(storeUid: string): Promise<Product[]> {
    return super.findManyBy("store_uid", storeUid);
  }
}
