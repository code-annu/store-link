import {Buyer, BuyerCreate, BuyerUpdate} from "../entity/buyer";

export interface IBuyerRepository {
    createBuyer(buyerCreate: BuyerCreate): Promise<Buyer>

    getBuyer(buyerUid: string): Promise<Buyer | null>

    updateBuyer(buyerUid: string, updates: BuyerUpdate): Promise<Buyer | null>

    deleteBuyer(buyerUid: string): Promise<Buyer | null>
}