import {IUserRepository} from "../../../domain/repository/IUserRepository";
import {UserCreate, UserRole} from "../../../domain/entity/user";
import bcrypt from "bcrypt";
import {generateTokens} from "../../../util/jwt-util";
import {AuthOutput, SignupInput} from "../../dto/auth-dto";
import {ConflictError} from "../../../domain/error/ConflictError";


export class SignupUsecase {
    private SALT_ROUNDS = 10;

    constructor(private readonly userRepo: IUserRepository) {
    }

    async execute(signupInput: SignupInput): Promise<AuthOutput> {
        const user = await this.userRepo.getUserByEmail(signupInput.email);
        if (user) {
            throw new ConflictError(`User with email ${signupInput.email} already exists! Try to login`);
        }
        const hashedPassword = await bcrypt.hash(signupInput.password, this.SALT_ROUNDS);

        const userCreate: UserCreate = {
            email: signupInput.email,
            password_hash: hashedPassword,
            role: signupInput.role
        }

        const createdUser = await this.userRepo.createUser(userCreate)

        const {accessToken, refreshToken} = generateTokens({userId: createdUser.uid, email: createdUser.email})

        await this.userRepo.updateUser(createdUser.uid, {
            refresh_token: refreshToken
        });

        return {
            user: {
                uid: createdUser.uid,
                email: createdUser.email,
                role: createdUser.role,
                created_at: createdUser.created_at,
            },
            access_token: accessToken,
            refresh_token: refreshToken
        } as AuthOutput
    }
}