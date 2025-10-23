import {IDeliveryPartnerRepository} from "../../../domain/repository/IDeliveryPartnerRepository";
import {DeliveryPartner} from "../../../domain/entity/delivery-partner";
import {NotFoundError} from "../../../domain/error/NotFoundError";

export class GetDeliveryPartnerProfileUsecase {
    constructor(private readonly deliveryPartnerRepo: IDeliveryPartnerRepository) {
    }

    async execute(deliveryPartnerUid: string): Promise<DeliveryPartner> {
        const deliveryPartner = await this.deliveryPartnerRepo.getDeliveryPartner(deliveryPartnerUid);

        if (!deliveryPartner) {
            throw new NotFoundError('Delivery Partner profile not found.');
        }

        return deliveryPartner;
    }

}