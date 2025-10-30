import { useState } from "react";
import { AuthRepository } from "../../infrastructure/repository/AuthRepository";
import { useAuthContext } from "../context/auth/AuthContext";
import { LoginUsecase } from "../usecase/auth/LoginUsecase";
import { SignupUsecase } from "../usecase/auth/SignupUsecase";
import { AxiosError } from "axios";

export function useAuth() {
  const { user, setUser } = useAuthContext();
  const [error, setError] = useState<string | null>(null);
  const authRepo = new AuthRepository();
  const signupUsecase = new SignupUsecase(authRepo);
  const loginUsecase = new LoginUsecase(authRepo);

  const signup = async (cred: { email: string; password: string }) => {
    try {
      const authUser = await signupUsecase.execute({
        email: cred.email,
        password: cred.password,
        role: "seller",
      });
      setUser(authUser);
      console.log(authUser);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        setError(err.response?.data.error);
      } else {
        setError((err as Error).message);
      }
    }
  };

  const login = async (cred: { email: string; password: string }) => {
    try {
      const authUser = await loginUsecase.execute({
        email: cred.email,
        password: cred.password,
      });
      setUser(authUser);
      console.log(authUser);
    } catch (err) {
      console.log(err);
      if (err instanceof AxiosError) {
        setError(err.response?.data.error);
      } else {
        setError((err as Error).message);
      }
    }
  };

  const refreshToken = async () => {
    // Implement refresh token
  };

  return { user, signup, error, setError, login, refreshToken };
}
