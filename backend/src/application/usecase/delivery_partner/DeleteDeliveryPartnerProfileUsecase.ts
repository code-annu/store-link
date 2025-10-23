import {DeliveryPartner} from "../../../domain/entity/delivery-partner";
import {IDeliveryPartnerRepository} from "../../../domain/repository/IDeliveryPartnerRepository";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";

export class DeleteDeliveryPartnerProfileUsecase {
    constructor(private readonly deliveryPartnerRepo: IDeliveryPartnerRepository, private readonly userRepo: IUserRepository) {
    }

    async execute(
        deliveryPartnerUid: string
    ): Promise<DeliveryPartner> {
        const deliveryPartner = await this.deliveryPartnerRepo.deleteDeliveryPartner(deliveryPartnerUid);
        if (!deliveryPartner) {
            throw new NotFoundError('Delivery Partner profile not found');
        }

        return deliveryPartner
    }
}