export interface User {
    uid: string;
    email: string;
    password_hash: string;
    role: string;
    created_at: string;
    refresh_token?: string;
}

export interface UserCreate extends Omit<User, "uid" | "created_at" | "refresh_token"> {
}

export interface UserUpdate extends Partial<Pick<User, "refresh_token" | "role">> {
}

export enum UserRole {
    SELLER = "seller",
    BUYER = "buyer",
    DELIVERY_PARTNER = "delivery_partner",
}


