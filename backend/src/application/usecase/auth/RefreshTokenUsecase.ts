import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {AuthOutput} from "../../dto/auth-dto";
import {generateTokens, verifyRefreshToken} from "../../../util/jwt-util";
import {NotFoundError} from "../../../domain/error/NotFoundError";
import {UnauthorizedError} from "../../../domain/error/UnauthorizedError";

export class RefreshTokenUsecase {
    constructor(private readonly userRepo: IUserRepository) {
    }

    async execute(token: string): Promise<AuthOutput> {
        const decodedData = verifyRefreshToken(token);
        const user = await this.userRepo.getUserByUid(decodedData.userId);
        if (user == null) {
            throw new NotFoundError(
                `User not found! Account my be deleted or deactivated`,
            );
        }

        if (user.refresh_token != token) {
            throw new UnauthorizedError(
                "Refresh token not found! Maybe changed or expired. Try to login",
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
        } as AuthOutput
    }
}