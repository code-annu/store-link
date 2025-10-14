export interface AuthUser {
  uid: string;
  email: string;
  created_at: string;
  role: UserRole;
  readonly password_hash: string;
  refresh_token?: string;
  access_token?: string;
}

export enum UserRole {
  SELLER = "seller",
  BUYER = "buyer",
  DELIVERY_AGENT = "delivery_agent",
}

export interface AuthUserCreate
  extends Pick<AuthUser, "email" | "password_hash" | "role"> {}

export interface AuthUserUpdate
  extends Partial<Pick<AuthUser, "role" | "refresh_token">> {}
