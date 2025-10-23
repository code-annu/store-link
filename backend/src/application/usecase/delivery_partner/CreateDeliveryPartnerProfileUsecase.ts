import {
  DeliveryPartner,
  DeliveryPartnerCreate,
} from "../../../domain/entity/delivery-partner";
import { IDeliveryPartnerRepository } from "../../../domain/repository/IDeliveryPartnerRepository";
import { IUserRepository } from "../../../domain/repository/IUserRepository";
import { NotFoundError } from "../../../domain/error/NotFoundError";
import { UserRole } from "../../../domain/entity/user";
import { ForbiddenError } from "../../../domain/error/ForbiddenError";
import { ConflictError } from "../../../domain/error/ConflictError";

export class CreateDeliveryPartnerProfileUsecase {
  constructor(
    private readonly deliveryPartnerRepo: IDeliveryPartnerRepository,
    private readonly userRepo: IUserRepository
  ) {}

  async execute(
    deliveryPartnerCreate: DeliveryPartnerCreate
  ): Promise<DeliveryPartner> {
    const user = await this.userRepo.getUserByUid(deliveryPartnerCreate.uid);
    if (!user) {
      throw new NotFoundError("User does not exist");
    }

    if (user.role !== UserRole.DELIVERY_PARTNER) {
      throw new ForbiddenError(
        `You cannot create a delivery partner profile with ${user.role} role`
      );
    }

    const profile = await this.deliveryPartnerRepo.getDeliveryPartner(
      deliveryPartnerCreate.uid
    );

    if (profile) {
      throw new ConflictError(
        "Delivery partner profile is already created. You can update the profile."
      );
    }

    return await this.deliveryPartnerRepo.createDeliveryPartner(
      deliveryPartnerCreate
    );
  }
}
