import {Seller, SellerCreate, SellerUpdate} from "../entity/seller";

export interface ISellerRepository {
    createSeller(sellerCreate: SellerCreate): Promise<Seller>;

    getSeller(sellerUid: string): Promise<Seller | null>;

    updateSeller(sellerUid: string, updates: SellerUpdate): Promise<Seller | null>;

    deleteSeller(sellerUid: string): Promise<Seller | null>;

}