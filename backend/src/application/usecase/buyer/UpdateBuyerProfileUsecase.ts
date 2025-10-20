import {IBuyerRepository} from "../../../domain/repository/IBuyerRepository";
import {BuyerProfileUpdateInput} from "../../dto/buyer-dto";
import {Buyer, BuyerUpdate} from "../../../domain/entity/buyer";
import {NotFoundError} from "../../../domain/error/NotFoundError";

export class UpdateBuyerProfileUsecase {
    constructor(private readonly buyerRepo: IBuyerRepository) {
    }

    async execute(buyerUid: string, buyerProfileUpdateInput: Partial<BuyerProfileUpdateInput>): Promise<Buyer> {
        const updates: BuyerUpdate = {
            fullname: buyerProfileUpdateInput.fullname,
            address: buyerProfileUpdateInput.address,
            profile_picture_url: buyerProfileUpdateInput.profile_picture_url,
            has_subscription: buyerProfileUpdateInput.has_subscription,
        }
        const updatedBuyer = await this.buyerRepo.updateBuyer(buyerUid, updates)
        if (!updatedBuyer) {
            throw new NotFoundError("Buyer not found! Account may be deleted");
        }

        return updatedBuyer;
    }
}