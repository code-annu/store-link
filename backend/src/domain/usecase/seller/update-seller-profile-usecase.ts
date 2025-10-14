import { Seller, SellerUpdate } from "../../entity/seller";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserRepository } from "../../repository/iuser-repository";
import { ISellerRepository } from "../../repository/iseller-repository";
import { SellerDto } from "../../dto/seller-dto";

export class UpdateSellerProfile {
  constructor(
    private readonly sellerRepo: ISellerRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(sellerUid: string, updates: SellerUpdate): Promise<SellerDto> {
    const user = await this.userRepo.getUserByUid(sellerUid);
    if (user == null) {
      throw new CustomError(
        "User not found account may be deleted. Visit '/signup' for new account creation.",
        ErrorType.UNAUTHORIZED
      );
    }
    const sellerProfile = await this.sellerRepo.updateSeller(
      sellerUid,
      updates
    );

    if (sellerProfile == null) {
      throw new CustomError("Seller profile not found", ErrorType.NOT_FOUND);
    }

    return { ...sellerProfile, role: user.role };
  }
}
