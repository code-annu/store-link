import { AuthUser } from "../../entity/auth-user";
import { CustomError } from "../../error/custom-error";
import { ErrorType } from "../../error/error-type";
import { IUserRepository } from "../../repository/iuser-repository";

export class DeleteUser {
  constructor(private readonly authRepo: IUserRepository) {}

  async execute(uid: string): Promise<AuthUser> {
    const user = await this.authRepo.deleteUserByUid(uid);
    if (user == null) {
      throw new CustomError("User not found!", ErrorType.NOT_FOUND);
    }
    return user;
  }
}
