import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../util/jwt-util";
import { AuthUser, UserRole } from "../../entity/auth-user";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserRepository } from "../../repository/iuser-repository";

export class UpdateUserRole {
  constructor(private readonly userRepo: IUserRepository) {}

  async execute(uid: string, role: UserRole): Promise<AuthUser> {
    const user = await this.userRepo.updateUserByUid(uid, { role: role });
    if (user == null) {
      throw new CustomError("User not found", ErrorType.NOT_FOUND);
    }

    const accessToken = generateAccessToken({
      userId: user.uid,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.uid,
      email: user.email,
    });

    await this.userRepo.updateUserByUid(user.uid, {
      refresh_token: refreshToken,
    });
    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    return user;
  }
}
