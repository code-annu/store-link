import {IBuyerRepository} from "../../../domain/repository/IBuyerRepository";
import {Buyer} from "../../../domain/entity/buyer";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {IUserRepository} from "../../../domain/repository/IUserRepository";

export class DeleteBuyerProfileUsecase {
    constructor(private readonly buyerRepo: IBuyerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(buyerUid: string): Promise<Buyer> {
        const buyer = await this.buyerRepo.getBuyer(buyerUid)
        if (!buyer) {
            throw new NotFoundError("Buyer profile not found! Account may be deleted");
        }

        await this.userRepo.deleteUser(buyerUid)

        return buyer;
    }
}

