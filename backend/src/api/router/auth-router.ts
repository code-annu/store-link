import { Router } from "express";
import { AuthController } from "../controller/auth-controller";
import { validateRequestBody } from "../middleware/validate-request-body";
import {
  loginSchema,
  refreshTokenSchema,
  signupSchema,
} from "../schema/auth-schema";
import { UserRepository } from "../../infrastructure/repository/user-repository";

export const authRouter = Router({ mergeParams: true });
const authController = new AuthController(new UserRepository());

authRouter.post(
  "/signup",
  validateRequestBody(signupSchema),
  authController.postSignup.bind(authController)
);

authRouter.post(
  "/login",
  validateRequestBody(loginSchema),
  authController.postLogin.bind(authController)
);

authRouter.post(
  "/refresh-token",
  validateRequestBody(refreshTokenSchema),
  authController.postRefreshToken.bind(authController)
);


