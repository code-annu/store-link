import { Seller, SellerCreate } from "../../entity/seller";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserRepository } from "../../repository/iuser-repository";
import { ISellerRepository } from "../../repository/iseller-repository";
import { UserRole } from "../../entity/auth-user";
import { SellerDto } from "../../dto/seller-dto";

export class CreateSellerProfile {
  constructor(
    private readonly sellerRepo: ISellerRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    sellerUid: string,
    sellerData: SellerCreate
  ): Promise<SellerDto> {
    const user = await this.userRepo.updateUserByUid(sellerUid, {
      role: UserRole.SELLER,
    });
    if (user == null) {
      throw new CustomError(
        "User not found account may be deleted. Visit '/signup' for new account creation.",
        ErrorType.UNAUTHORIZED
      );
    }
    const sellerProfile = await this.sellerRepo.createSeller({
      ...sellerData,
      uid: sellerUid,
    });

    return {
      ...sellerProfile,
      role: user.role,
    };
  }
}
