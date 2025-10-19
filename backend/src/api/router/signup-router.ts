import {Router} from "express";
import {UserRepository} from "../../infrastructure/repository/UserRepository";
import {AuthController} from "../controller/AuthController";
import {validateRequestBody} from "../middleware/validate-request-body";
import {LoginSchema, RefreshTokenSchema, SignupSchema} from "../schema/auth-schema";

export const authRouter = Router({mergeParams: true})
const authController = new AuthController(new UserRepository());

authRouter.post('/signup', validateRequestBody(SignupSchema), authController.postSignup.bind(authController))
authRouter.post('/login', validateRequestBody(LoginSchema), authController.postLogin.bind(authController))
authRouter.post('/refresh-token', validateRequestBody(RefreshTokenSchema), authController.postRefreshToken.bind(authController))
