import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../../../util/jwt-util";
import { AuthUser } from "../../entity/auth-user";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserAuthRepository } from "../../repository/iauth-repository";

export class RefreshToken {
  constructor(private readonly userRepository: IUserAuthRepository) {}
  async execute(token: string): Promise<AuthUser> {
    const decodedData = verifyRefreshToken(token);
    const user = await this.userRepository.getAuthUserByUid(decodedData.userId);

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

    await this.userRepository.updateUserRefreshToken(user.uid, refreshToken);
    user.access_token = accessToken;
    user.refresh_token = refreshToken;

    return user;
  }
}
