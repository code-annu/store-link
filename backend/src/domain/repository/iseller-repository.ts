import { Seller, SellerCreate, SellerUpdate } from "../entity/seller";

export interface ISellerRepository {
  createSeller(sellerData: SellerCreate): Promise<Seller>;
  getSellerByUid(uid: string): Promise<Seller | null>;
  updateSeller(uid: string, updates: SellerUpdate): Promise<Seller | null>;
  deleteSellerByUid(uid: string): Promise<Seller | null>;
}
