import { AuthUserCreate, AuthUser } from "../../domain/entity/auth-user";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { IUserAuthRepository } from "../../domain/repository/iauth-repository";
import { BaseRepository } from "./base-repository";

const AUTH_TABLE = "auth";

export class AuthUserRepository
  extends BaseRepository
  implements IUserAuthRepository
{
  constructor() {
    super(AUTH_TABLE);
  }

  async createAuthUser(userData: AuthUserCreate): Promise<AuthUser> {
    const { data, error } = await super.insert(userData);
    if (error) {
      switch (error.code) {
        case "23505":
          throw new CustomError(
            "Email already exists",
            ErrorType.RESOURCE_ALREADY_EXISTS
          );
        default:
          throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
      }
    }
    return data as AuthUser;
  }

  async getAuthUserByUid(uid: string): Promise<AuthUser | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as AuthUser;
  }

  async getAuthUserByEmail(email: string): Promise<AuthUser | null> {
    const { data, error } = await super.getByKey("email", email);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as AuthUser;
  }

  async updateUserRefreshToken(
    uid: string,
    refreshToken: string
  ): Promise<AuthUser | null> {
    const { data, error } = await super.update(uid, {
      refresh_token: refreshToken,
    });

    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as AuthUser;
  }

  async deleteUser(uid: string): Promise<AuthUser | null> {
    const { data, error } = await super.delete(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as AuthUser;
  }
}
