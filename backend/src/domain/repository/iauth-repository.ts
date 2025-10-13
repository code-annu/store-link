import { AuthUser, AuthUserCreate } from "../entity/auth-user";

export interface IUserAuthRepository {
  createAuthUser(userData: AuthUserCreate): Promise<AuthUser>;

  getAuthUserByUid(uid: string): Promise<AuthUser | null>;

  getAuthUserByEmail(email: string): Promise<AuthUser | null>;

  updateUserRefreshToken(
    uid: string,
    refreshToken: string
  ): Promise<AuthUser | null>;

  deleteUser(uid: string): Promise<AuthUser | null>;
}
