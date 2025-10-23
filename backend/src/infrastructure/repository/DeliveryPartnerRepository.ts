import {
  DeliveryPartner,
  DeliveryPartnerCreate,
  DeliveryPartnerUpdate,
} from "../../domain/entity/delivery-partner";
import { IDeliveryPartnerRepository } from "../../domain/repository/IDeliveryPartnerRepository";
import { BaseRepository } from "./BaseRepository";

const DELIVERY_PARTNER_TABLE = "delivery_partners";
export class DeliveryPartnerRepository
  extends BaseRepository<DeliveryPartner>
  implements IDeliveryPartnerRepository
{
  constructor() {
    super(DELIVERY_PARTNER_TABLE);
  }

  async createDeliveryPartner(
    deliveryPartnerCreate: DeliveryPartnerCreate
  ): Promise<DeliveryPartner> {
    return super.create(deliveryPartnerCreate);
  }

  async getDeliveryPartner(
    deliveryPartnerUid: string
  ): Promise<DeliveryPartner | null> {
    return super.findBy("uid", deliveryPartnerUid);
  }

  async deleteDeliveryPartner(
    deliveryPartnerUid: string
  ): Promise<DeliveryPartner | null> {
    return super.deleteOne("uid", deliveryPartnerUid);
  }

  async updateDeliveryPartner(
    deliveryPartnerUid: string,
    updates: DeliveryPartnerUpdate
  ): Promise<DeliveryPartner | null> {
    return super.updateOne("uid", deliveryPartnerUid, updates);
  }
}
