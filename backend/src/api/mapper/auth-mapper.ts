import { AuthUser } from "../../domain/entity/auth-user";
import { AuthResponse } from "../dto/auth-response";

export function mapToAuthResponse(authUser: AuthUser): AuthResponse {
  const { uid, email, created_at, role, refresh_token, access_token } =
    authUser;
  const authResponse: AuthResponse = {
    uid: uid,
    email: email,
    created_at: created_at,
    role: role,
    access_token: access_token,
    refresh_token: refresh_token,
  };
  return authResponse;
}
