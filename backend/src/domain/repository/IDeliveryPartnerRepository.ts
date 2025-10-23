import {DeliveryPartner, DeliveryPartnerCreate, DeliveryPartnerUpdate} from "../entity/delivery-partner";

export interface IDeliveryPartnerRepository {
    createDeliveryPartner(deliveryPartnerCreate: DeliveryPartnerCreate): Promise<DeliveryPartner>;

    getDeliveryPartner(deliveryPartnerUid: string): Promise<DeliveryPartner | null>;

    deleteDeliveryPartner(deliveryPartnerUid: string): Promise<DeliveryPartner | null>;

    updateDeliveryPartner(deliveryPartnerUid: string, updates: DeliveryPartnerUpdate): Promise<DeliveryPartner | null>
}