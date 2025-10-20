export interface SellerProfileInput {
    fullname: string;
    profile_picture_url: string;
}

export interface SellerProfileUpdateInput extends Partial<SellerProfileInput> {
}

export interface SellerProfileOutput {
    uid: string;
    fullname: string;
    verified: boolean;
    profile_picture_url: string;
    created_at: string;
    role: string;
}