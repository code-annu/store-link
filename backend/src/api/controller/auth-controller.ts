import { Request, Response } from "express";
import { Login } from "../../domain/usecase/auth/login-usecase";
import { Signup } from "../../domain/usecase/auth/signup-usecase";
import { RefreshToken } from "../../domain/usecase/auth/refresh-token-usecase";
import { IUserRepository } from "../../domain/repository/iuser-repository";
import { CustomError } from "../../domain/error/custom-error";
import { mapToAuthResponse } from "../mapper/auth-mapper";
import { UpdateUserRole } from "../../domain/usecase/auth/update-user-role-usecase";

export class AuthController {
  private login: Login;
  private signup: Signup;
  private refreshToken: RefreshToken;

  constructor(userRepo: IUserRepository) {
    this.login = new Login(userRepo);
    this.signup = new Signup(userRepo);
    this.refreshToken = new RefreshToken(userRepo);
  }

  async postSignup(req: Request, res: Response) {
    try {
      const { email, password, role } = req.body;
      const userWithSession = await this.signup.execute({
        email: email,
        password: password,
        role: role,
      });
      res.status(201).json(mapToAuthResponse(userWithSession));
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async postLogin(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const userWithSession = await this.login.execute(email, password);
      res.status(200).json(mapToAuthResponse(userWithSession));
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }

  async postRefreshToken(req: Request, res: Response) {
    try {
      const { refresh_token } = req.body;
      const userWithSession = await this.refreshToken.execute(refresh_token);
      res.status(200).json(mapToAuthResponse(userWithSession));
    } catch (e) {
      if (e instanceof CustomError) {
        res.status(e.errorType).json({ message: e.message });
      } else {
        res.status(500).json({ message: (e as Error).message });
      }
    }
  }
}
