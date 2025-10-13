import { UserRole } from "../../domain/entity/auth-user";

export interface AuthResponse {
  uid: string;
  email: string;
  created_at: string;
  role: UserRole;
  access_token: string | undefined;
  refresh_token: string | undefined;
}
