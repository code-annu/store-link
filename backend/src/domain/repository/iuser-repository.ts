import { AuthUser, AuthUserCreate, AuthUserUpdate } from "../entity/auth-user";

export interface IUserRepository {
  createUser(userData: AuthUserCreate): Promise<AuthUser>;

  getUserByUid(uid: string): Promise<AuthUser | null>;

  getUserByEmail(email: string): Promise<AuthUser | null>;

  updateUserByUid(
    uid: string,
    updates: AuthUserUpdate
  ): Promise<AuthUser | null>;

  deleteUserByUid(uid: string): Promise<AuthUser | null>;
}
