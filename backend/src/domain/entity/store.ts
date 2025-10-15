export interface Store {
  uid: string;
  owner_uid: string;
  store_name: string;
  store_description: string;
  store_address: string;
  store_image_url: string;
  created_at: string;
}

export interface StoreCreate extends Omit<Store, "uid" | "created_at"> {}

export interface StoreUpdate
  extends Partial<
    Pick<
      Store,
      "store_name" | "store_description" | "store_address" | "store_image_url"
    >
  > {}
