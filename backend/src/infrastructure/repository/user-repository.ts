import {
  AuthUserCreate,
  AuthUser,
  AuthUserUpdate,
} from "../../domain/entity/auth-user";
import { CustomError } from "../../domain/error/custom-error";
import { ErrorType } from "../../domain/error/error-type";
import { IUserRepository } from "../../domain/repository/iuser-repository";
import { BaseRepository } from "./base-repository";

const AUTH_TABLE = "auth";

export class UserRepository extends BaseRepository implements IUserRepository {
  constructor() {
    super(AUTH_TABLE);
  }

  async createUser(userData: AuthUserCreate): Promise<AuthUser> {
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

  async getUserByUid(uid: string): Promise<AuthUser | null> {
    const { data, error } = await super.getByUid(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as AuthUser;
  }

  async getUserByEmail(email: string): Promise<AuthUser | null> {
    const { data, error } = await super.getByKey("email", email);
    if (data == null) return null;
    if (error) {
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as AuthUser;
  }

  async updateUserByUid(
    uid: string,
    updates: AuthUserUpdate
  ): Promise<AuthUser | null> {
    const { data, error } = await super.update(uid, updates);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }

    return data as AuthUser;
  }

  async deleteUserByUid(uid: string): Promise<AuthUser | null> {
    const { data, error } = await super.delete(uid);
    if (data == null) return null;
    if (error) {
      console.log(error);
      throw new CustomError(error.message, ErrorType.INTERNAL_SERVER_ERROR);
    }
    return data as AuthUser;
  }
}
