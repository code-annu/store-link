export interface DeliveryPartner {
  uid: string;
  fullname: string;
  profile_picture_url: string;
  total_deliveries: number;
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

export interface DeliveryPartnerCreate
  extends Omit<DeliveryPartner, "created_at" | "is_active" | "is_verified"> {}

export interface DeliveryPartnerUpdate
  extends Partial<
    Pick<
      DeliveryPartner,
      "fullname" | "profile_picture_url" | "total_deliveries" | "is_active"
    >
  > {}
