import { Product, ProductCreate, ProductUpdate } from "../entity/product";

export interface IProductRepository {
  createProduct(productData: ProductCreate): Promise<Product>;
  getProductByUid(uid: string): Promise<Product | null>;
  updateProduct(uid: string, updates: ProductUpdate): Promise<Product | null>;
  deleteProduct(uid: string): Promise<Product | null>;
  getProductsByName(name: string): Promise<Product[]>;
  getProductsByCategories(categories: string[]): Promise<Product[]>;
}
