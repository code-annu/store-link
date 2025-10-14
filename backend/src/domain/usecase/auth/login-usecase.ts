import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../util/jwt-util";
import { AuthUser } from "../../entity/auth-user";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserRepository } from "../../repository/iuser-repository";
import bcrypt from "bcrypt";

export class Login {
  constructor(private readonly userAuthRepo: IUserRepository) {}

  async execute(email: string, password: string): Promise<AuthUser> {
    const user = await this.userAuthRepo.getUserByEmail(email);
    if (user == null) {
      throw new CustomError(
        `User with email ${email} not found! Try to signup`,
        ErrorType.NOT_FOUND
      );
    }
    const matched = await bcrypt.compare(password, user.password_hash);

    if (!matched) {
      throw new CustomError(
        "Invalid user password. Please try again",
        ErrorType.UNAUTHORIZED
      );
    }

    const accessToken = generateAccessToken({
      userId: user.uid,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.uid,
      email: user.email,
    });

    await this.userAuthRepo.updateUserByUid(user.uid, {
      refresh_token: refreshToken,
    });
    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    return user;
  }
}
