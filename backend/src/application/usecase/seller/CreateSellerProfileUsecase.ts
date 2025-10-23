import { ISellerRepository } from "../../../domain/repository/ISellerRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UserRole } from "../../../domain/entity/user";
import { SellerCreate } from "../../../domain/entity/seller";
import { SellerProfileOutput } from "../../dto/seller-dto";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { ConflictError } from "../../../domain/error/ConflictError";

export class CreateSellerProfileUsecase {
  constructor(
    private readonly sellerRepo: ISellerRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(sellerCreate: SellerCreate): Promise<SellerProfileOutput> {
    const user = await this.userRepo.getUserByUid(sellerCreate.uid);
    if (!user) {
      throw new NotFoundError(
        "User not found. You need to create account before creating profile"
      );
    }

    if (user.role != UserRole.SELLER) {
      throw new ForbiddenError(
        `You are not allowed to create a seller profile with role ${user.role}}`
      );
    }

    const profile = await this.sellerRepo.getSeller(sellerCreate.uid);
    if (profile) {
      throw new ConflictError(
        "Seller profile is already created.You can update the profile"
      );
    }

    const seller = await this.sellerRepo.createSeller(sellerCreate);

    return {
      ...seller,
      role: user.role,
    } as SellerProfileOutput;
  }
}
