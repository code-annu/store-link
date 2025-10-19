import {AuthOutput, LoginInput} from "../../dto/auth-dto";
import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import bcrypt from "bcrypt";
import {UnauthorizedError} from "../../../domain/error/UnauthorizedError";
import {generateTokens} from "../../../util/jwt-util";


export class LoginUsecase {
    private SALT_ROUNDS = 10;

    constructor(private readonly userRepo: IUserRepository) {
    }

    async execute(loginInput: LoginInput): Promise<AuthOutput> {
        const user = await this.userRepo.getUserByEmail(loginInput.email)
        if (user == null) {
            throw new NotFoundError(`User with email ${loginInput.email} not found. Try to signup`);
        }

        const matched = await bcrypt.compare(loginInput.password, user.password_hash);

        if (!matched) {
            throw new UnauthorizedError(
                "Invalid user password. Please try again with another password",
            );
        }

        const {accessToken, refreshToken} = generateTokens({userId: user.uid, email: user.email})

        await this.userRepo.updateUser(user.uid, {
            refresh_token: refreshToken,
        });

        return {
            user: {
                uid: user.uid,
                email: user.email,
                role: user.role,
                created_at: user.created_at,
            },
            access_token: accessToken,
            refresh_token: refreshToken
        } as AuthOutput;


    }
}