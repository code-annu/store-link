import type { AuthUser, LoginCredentials } from "../../../domain/model/user";
import type { IAuthRepository } from "../../../domain/repository/IAuthRepository";

export class LoginUsecase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(loginCred: LoginCredentials): Promise<AuthUser> {
    return this.authRepo.login(loginCred);
  }
}
