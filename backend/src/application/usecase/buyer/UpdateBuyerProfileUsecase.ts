import { IBuyerRepository } from "../../../domain/repository/IBuyerRepository";
import { Buyer, BuyerUpdate } from "../../../domain/entity/buyer";
import { NotFoundError } from "../../../domain/error/NotFoundError";

export class UpdateBuyerProfileUsecase {
  constructor(private readonly buyerRepo: IBuyerRepository) {}

  async execute(buyerUid: string, updates: BuyerUpdate): Promise<Buyer> {
    const updatedBuyer = await this.buyerRepo.updateBuyer(buyerUid, updates);
    if (!updatedBuyer) {
      throw new NotFoundError("Buyer not found! Account may be deleted");
    }

    return updatedBuyer;
  }
}
