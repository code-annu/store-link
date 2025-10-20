export interface Seller {
    uid: string;
    fullname: string;
    verified: boolean;
    profile_picture_url: string;
    created_at: string;
}

export interface SellerCreate
    extends Pick<Seller, "fullname" | "profile_picture_url" | "uid"> {
}

export interface SellerUpdate
    extends Partial<Pick<Seller, "fullname" | "profile_picture_url" | "verified">> {
}