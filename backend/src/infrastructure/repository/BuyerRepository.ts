import {BaseRepository} from "./BaseRepository";
import {Buyer, BuyerCreate, BuyerUpdate} from "../../domain/entity/buyer";
import {IBuyerRepository} from "../../domain/repository/IBuyerRepository";

const BUYER_TABLE = 'buyers'

export class BuyerRepository extends BaseRepository<Buyer> implements IBuyerRepository {
    constructor() {
        super(BUYER_TABLE);
    }

    async createBuyer(buyerCreate: BuyerCreate): Promise<Buyer> {
        return super.create(buyerCreate)
    }

    async deleteBuyer(buyerUid: string): Promise<Buyer | null> {
        return super.deleteOne('uid', buyerUid)
    }

    async getBuyer(buyerUid: string): Promise<Buyer | null> {
        return super.findBy('uid', buyerUid)
    }

    async updateBuyer(buyerUid: string, updates: BuyerUpdate): Promise<Buyer | null> {
        return super.updateOne('uid', buyerUid, updates)
    }
}