import { Product, ProductCreate, ProductUpdate } from "../entity/product";

export interface IProductRepository {
  createProduct(productCreate: ProductCreate): Promise<Product>;

  getProduct(productUid: string): Promise<Product | null>;

  deleteProduct(productUid: string): Promise<Product | null>;

  updateProduct(
    productUid: string,
    updates: ProductUpdate
  ): Promise<Product | null>;

  getListOfRandomProducts(): Promise<Product[]>;

  searchProducts(query: string): Promise<Product[]>;

  getListOfProducts(category: string): Promise<Product[]>;

  getProductsOfStore(storeUid: string): Promise<Product[]>;
  
}
