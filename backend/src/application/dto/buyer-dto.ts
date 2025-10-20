export interface BuyerProfileInput {
    fullname: string;
    address: string;
    profile_picture_url: string
}

export interface BuyerProfileUpdateInput {
    fullname: string
    address: string
    profile_picture_url: string
    has_subscription: boolean;
}