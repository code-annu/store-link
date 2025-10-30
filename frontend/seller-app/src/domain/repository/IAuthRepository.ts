import type {
  AuthUser,
  LoginCredentials,
  SignupCredentials,
} from "../model/user";

export interface IAuthRepository {
  signup(cred: SignupCredentials): Promise<AuthUser>;
  login(cred: LoginCredentials): Promise<AuthUser>;
  refreshToken(token: string): Promise<AuthUser>;
}
