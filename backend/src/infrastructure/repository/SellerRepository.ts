import {BaseRepository} from "./BaseRepository";
import {Seller, SellerCreate, SellerUpdate} from "../../domain/entity/seller";
import {ISellerRepository} from "../../domain/repository/ISellerRepository";

const SELLER_TABLE = 'sellers';

export class SellerRepository extends BaseRepository<Seller> implements ISellerRepository {
    constructor() {
        super(SELLER_TABLE);
    }

    async createSeller(sellerCreate: SellerCreate): Promise<Seller> {
        return super.create(sellerCreate);
    }

    async deleteSeller(sellerUid: string): Promise<Seller | null> {
        return super.deleteOne("uid", sellerUid)
    }

    async getSeller(sellerUid: string): Promise<Seller | null> {
        return super.findBy("uid", sellerUid);
    }

    async updateSeller(sellerUid: string, updates: SellerUpdate): Promise<Seller | null> {
        return super.updateOne("uid", sellerUid, updates);
    }

}