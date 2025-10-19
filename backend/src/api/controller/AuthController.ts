import {SignupUsecase} from "../../application/usecase/auth/SignupUsecase";
import {LoginUsecase} from "../../application/usecase/auth/LoginUsecase";
import {RefreshTokenUsecase} from "../../application/usecase/auth/RefreshTokenUsecase";
import {IUserRepository} from "../../domain/repository/IUserRepository";
import {Request, Response, NextFunction} from "express";

export class AuthController {
    private readonly signupUsecase: SignupUsecase
    private readonly loginUsecase: LoginUsecase
    private readonly refreshTokenUsecase: RefreshTokenUsecase

    constructor(userRepo: IUserRepository) {
        this.signupUsecase = new SignupUsecase(userRepo)
        this.loginUsecase = new LoginUsecase(userRepo)
        this.refreshTokenUsecase = new RefreshTokenUsecase(userRepo)
    }

    async postSignup(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password, role} = req.body
            const result = await this.signupUsecase.execute({email: email, password: password, role: role})
            res.status(201).json(result)
        } catch (error) {
            next(error)
        }
    }

    async postLogin(req: Request, res: Response, next: NextFunction) {
        try {
            const {email, password} = req.body
            const result = await this.loginUsecase.execute({email: email, password: password})
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }

    async postRefreshToken(req: Request, res: Response, next: NextFunction) {
        try {
            const {refresh_token} = req.body
            const result = await this.refreshTokenUsecase.execute(refresh_token)
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }


}