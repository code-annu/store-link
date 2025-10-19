import {User} from "@supabase/supabase-js";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";

export class DeleteUserUseCase {
    constructor(private readonly userRepo: IUserRepository) {
    }

    async execute(uid: string): Promise<void> {
        const user = await this.userRepo.deleteUser(uid);
        if (user == null) {
            throw new NotFoundError("User not found!");
        }
    }
}