import {IBuyerRepository} from "../../../domain/repository/IBuyerRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {Buyer} from "../../../domain/entity/buyer";

export class GetBuyerProfileUsecase {
    constructor(private readonly buyerRepo: IBuyerRepository) {
    }

    async execute(buyerUid: string): Promise<Buyer> {
        const buyerProfile = await this.buyerRepo.getBuyer(buyerUid)
        if (!buyerProfile) {
            throw new NotFoundError('Buyer profile not found');
        }
        return buyerProfile
    }
}
