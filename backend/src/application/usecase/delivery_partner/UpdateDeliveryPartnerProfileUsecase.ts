import {DeliveryPartner, DeliveryPartnerUpdate} from "../../../domain/entity/delivery-partner";
import {IDeliveryPartnerRepository} from "../../../domain/repository/IDeliveryPartnerRepository";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";

export class UpdateDeliveryPartnerProfileUsecase {
    constructor(private readonly deliveryPartnerRepo: IDeliveryPartnerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(
        deliveryPartnerUid: string,
        updates: DeliveryPartnerUpdate
    ): Promise<DeliveryPartner> {
        const deliveryPartner = await this.deliveryPartnerRepo.updateDeliveryPartner(deliveryPartnerUid, updates)
        if (!deliveryPartner) {
            throw new NotFoundError("Delivery Partner not found");
        }

        return deliveryPartner
    }
}