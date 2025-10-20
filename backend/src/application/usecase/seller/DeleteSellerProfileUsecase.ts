import {ISellerRepository} from "../../../domain/repository/ISellerRepository";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {SellerProfileOutput} from "../../dto/seller-dto";

export class DeleteSellerProfileUsecase {
    constructor(private readonly sellerRepo: ISellerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(sellerUid: string): Promise<SellerProfileOutput> {
        const user = await this.userRepo.getUserByUid(sellerUid);
        if (!user) {
            throw new NotFoundError('User not found. Account may be deleted');
        }

        const seller = await this.sellerRepo.deleteSeller(sellerUid)
        if (!seller) {
            throw new NotFoundError('Seller profile not found');
        }

        return {
            ...seller,
            role: user.role,
        } as SellerProfileOutput
    }

}