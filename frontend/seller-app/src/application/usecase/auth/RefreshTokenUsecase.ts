import type { AuthUser } from "../../../domain/model/user";
import type { IAuthRepository } from "../../../domain/repository/IAuthRepository";

export class RefreshTokenUsecase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(token: string): Promise<AuthUser> {
    return this.authRepo.refreshToken(token);
  }
}
