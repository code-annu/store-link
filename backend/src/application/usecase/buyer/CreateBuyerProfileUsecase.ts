import {IBuyerRepository} from "../../../domain/repository/IBuyerRepository";
import {Buyer, BuyerCreate} from "../../../domain/entity/buyer";
import {BuyerProfileInput} from "../../dto/buyer-dto";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {UserRole} from "../../../domain/entity/user";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {ConflictError} from "../../../domain/error/ConflictError";

export class CreateBuyerProfileUsecase {
    constructor(private readonly buyerRepo: IBuyerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(userUid: string, buyerProfileInput: BuyerProfileInput): Promise<Buyer> {
        const user = await this.userRepo.updateUser(userUid, {role: UserRole.BUYER})
        if (!user) {
            throw new NotFoundError('User not found. Please create account before creating profile');
        }

        const buyer = await this.buyerRepo.getBuyer(userUid)
        if (buyer) {
            throw new ConflictError("Buyer profile already created. You can update your profile")
        }

        const buyerCreate: BuyerCreate = {
            address: buyerProfileInput.address,
            fullname: buyerProfileInput.fullname,
            has_subscription: false,
            profile_picture_url: buyerProfileInput.profile_picture_url,
            uid: userUid
        }

        return await this.buyerRepo.createBuyer(buyerCreate);
    }
}