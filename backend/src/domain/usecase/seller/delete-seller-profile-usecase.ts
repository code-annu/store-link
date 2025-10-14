import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserRepository } from "../../repository/iuser-repository";

export class DeleteSellerProfile {
  constructor(private readonly authRepo: IUserRepository) {}

  async execute(sellerUid: string): Promise<string> {
    const seller = await this.authRepo.deleteUserByUid(sellerUid);
    if (seller == null) {
      throw new CustomError("Seller not found", ErrorType.NOT_FOUND);
    }
    return "Seller account deleted successfully";
  }
}
