import type { AuthUser, SignupCredentials } from "../../../domain/model/user";
import type { IAuthRepository } from "../../../domain/repository/IAuthRepository";

export class SignupUsecase {
  constructor(private readonly authRepo: IAuthRepository) {}

  async execute(signupCred: SignupCredentials): Promise<AuthUser> {
    return this.authRepo.signup(signupCred);
  }
}
