import { Product, ProductCreate, ProductUpdate } from "../entity/product";

export interface IProductRepository {
  insertProduct(productData: ProductCreate): Promise<Product>;
  getProductByUid(uid: string): Promise<Product | null>;
  updateProduct(updates: ProductUpdate): Promise<Product | null>;
  deleteProduct(uid: string): Promise<Product | null>;
  getProductsByName(name: string): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
}
