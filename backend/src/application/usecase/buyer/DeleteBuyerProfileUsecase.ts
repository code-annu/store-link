import { IBuyerRepository } from "../../../domain/repository/IBuyerRepository";
import { Buyer } from "../../../domain/entity/buyer";
import { NotFoundError } from "../../../domain/error/NotFoundError";

export class DeleteBuyerProfileUsecase {
  constructor(private readonly buyerRepo: IBuyerRepository) {}

  async execute(buyerUid: string): Promise<Buyer> {
    const buyer = await this.buyerRepo.deleteBuyer(buyerUid);
    if (!buyer) {
      throw new NotFoundError(
        "Buyer profile not found! Account may be deleted"
      );
    }
    return buyer;
  }
}
