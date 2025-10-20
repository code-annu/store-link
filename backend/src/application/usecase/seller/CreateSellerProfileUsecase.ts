import {ISellerRepository} from "../../../domain/repository/ISellerRepository";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {UserRole} from "../../../domain/entity/user";
import {SellerCreate} from "../../../domain/entity/seller";
import {SellerProfileOutput} from "../../dto/seller-dto";

export class CreateSellerProfileUsecase {
    constructor(private readonly sellerRepo: ISellerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(sellerCreate: SellerCreate): Promise<SellerProfileOutput> {
        const user = await this.userRepo.updateUser(sellerCreate.uid, {role: UserRole.SELLER})
        if (!user) {
            throw new NotFoundError('User not found. You need to create account before creating profile');
        }

        const seller = await this.sellerRepo.createSeller(sellerCreate)

        return {
            ...seller,
            role: user.role,
        } as SellerProfileOutput
    }

}