import {ISellerRepository} from "../../../domain/repository/ISellerRepository";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {SellerUpdate} from "../../../domain/entity/seller";
import {SellerProfileOutput} from "../../dto/seller-dto";

export class UpdateSellerProfileUsecase {
    constructor(private readonly sellerRepo: ISellerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(sellerUid: string, updates: SellerUpdate): Promise<SellerProfileOutput> {
        const user = await this.userRepo.getUserByUid(sellerUid);
        if (!user) {
            throw new NotFoundError('User not found. Account may be deleted');
        }

        const seller = await this.sellerRepo.updateSeller(sellerUid, updates)
        if (!seller) {
            throw new NotFoundError('Seller profile not found. Create new seller profile');
        }

        return {
            ...seller,
            role: user.role,
        } as SellerProfileOutput
    }

}