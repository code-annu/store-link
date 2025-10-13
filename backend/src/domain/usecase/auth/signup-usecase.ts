import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../util/jwt-util";
import { AuthUser, UserRole } from "../../entity/auth-user";
import bcrypt from "bcrypt";
import { IUserAuthRepository } from "../../repository/iauth-repository";

const SALT_ROUNDS = 10;
export class Signup {
  constructor(private readonly userAuthRepo: IUserAuthRepository) {}

  async execute({
    email,
    password,
    role,
  }: {
    email: string;
    password: string;
    role: UserRole;
  }): Promise<AuthUser> {
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await this.userAuthRepo.createAuthUser({
      email: email,
      password_hash: hashedPassword,
      role: role,
    });

    const accessToken = generateAccessToken({
      userId: user.uid,
      email: user.email,
    });

    const refreshToken = generateRefreshToken({
      userId: user.uid,
      email: user.email,
    });

    await this.userAuthRepo.updateUserRefreshToken(user.uid, refreshToken);
    user.access_token = accessToken;
    user.refresh_token = refreshToken;
    
    return user;
  }
}
