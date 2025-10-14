import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../util/jwt-util";
import { AuthUser } from "../../entity/auth-user";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserRepository } from "../../repository/iuser-repository";

export class RefreshToken {
  constructor(private readonly userRepository: IUserRepository) {}
  async execute(token: string): Promise<AuthUser> {
    const decodedData = verifyRefreshToken(token);
    const user = await this.userRepository.getUserByUid(decodedData.userId);

    if (user == null) {
      throw new CustomError(
        `User not found! Account my be deleted or deactivated`,
        ErrorType.NOT_FOUND
      );
    }

    if (user.refresh_token != token) {
      throw new CustomError(
        "Refresh token not found! Maybe changed or expired",
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

    await this.userRepository.updateUserByUid(user.uid, {
      refresh_token: refreshToken,
    });
    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    return user;
  }
}
