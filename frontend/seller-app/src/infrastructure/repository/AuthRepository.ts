import type {
  SignupCredentials,
  AuthUser,
  LoginCredentials,
} from "../../domain/model/user";
import type { IAuthRepository } from "../../domain/repository/IAuthRepository";
import { postRequest } from "../datasource/api/post-client";

export class AuthRepository implements IAuthRepository {
  async signup(cred: SignupCredentials): Promise<AuthUser> {
    const authUser = postRequest<AuthUser>("/auth/signup", cred);
    return authUser;
  }

  login(cred: LoginCredentials): Promise<AuthUser> {
    const authUser = postRequest<AuthUser>("/auth/login", cred);
    return authUser;
  }

  refreshToken(token: string): Promise<AuthUser> {
    const authUser = postRequest<AuthUser>("/auth/refresh-token", token);
    return authUser;
  }
}
