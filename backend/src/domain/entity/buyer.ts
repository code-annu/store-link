export interface Buyer {
    uid: string
    fullname: string
    address: string
    profile_picture_url: string
    has_subscription: boolean;
    created_at: string
}

export interface BuyerCreate extends Omit<Buyer, "created_at"> {
}

export interface BuyerUpdate
    extends Partial<Omit<Buyer, "uid" | "created_at">> {
}
