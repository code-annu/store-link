export interface Store {
    uid: string;
    owner_uid: string;
    name: string;
    description: string;
    address: string;
    image_url: string;
    created_at: string;
}

export interface StoreCreate extends Omit<Store, "uid" | "created_at"> {
}

export interface StoreUpdate
    extends Partial<
        Pick<Store, "name" | "description" | "address" | "image_url">
    > {
}