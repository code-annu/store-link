import { SellerDto } from "../../dto/seller-dto";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { ISellerRepository } from "../../repository/iseller-repository";
import { IUserRepository } from "../../repository/iuser-repository";

export class GetSellerProfile {
  constructor(
    private readonly sellerRepo: ISellerRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(sellerUid: string): Promise<SellerDto> {
    const user = await this.userRepo.getUserByUid(sellerUid);
    if (user == null) {
      throw new CustomError(
        "User not found. Account may be deleted",
        ErrorType.NOT_FOUND
      );
    }
    const sellerProfile = await this.sellerRepo.getSellerByUid(sellerUid);
    if (sellerProfile == null) {
      throw new CustomError("Seller profile not found", ErrorType.NOT_FOUND);
    }
    return {
      ...sellerProfile,
      role: user.role,
    };
  }
}
