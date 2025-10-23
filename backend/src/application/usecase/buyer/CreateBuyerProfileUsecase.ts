import {IBuyerRepository} from "../../../domain/repository/IBuyerRepository";
import {Buyer, BuyerCreate} from "../../../domain/entity/buyer";
import {BuyerProfileInput} from "../../dto/buyer-dto";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {UserRole} from "../../../domain/entity/user";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {ConflictError} from "../../../domain/error/ConflictError";
import {ForbiddenError} from "../../../domain/error/ForbiddenError";

export class CreateBuyerProfileUsecase {
    constructor(private readonly buyerRepo: IBuyerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(userUid: string, buyerProfileInput: BuyerProfileInput): Promise<Buyer> {
        const user = await this.userRepo.getUserByUid(userUid);
        if (!user) {
            throw new NotFoundError(`User not found. Please create account before creating profile`);
        }

        if (user.role != UserRole.BUYER) {
            throw new ForbiddenError(`Your are not allowed to create a buyer profile with role ${user.role}`)
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