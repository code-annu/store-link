import { createBrowserRouter } from "react-router-dom";
import SignupPage from "./presentation/pages/auth/SignupPage";
import LoginPage from "./presentation/pages/auth/LoginPage";
import HomePage from "./presentation/pages/dashboard/HomePage";

export enum AppRoute {
  HOME = "/",
  LOGIN = "/login",
  SIGNUP = "/signup",
}

export const appRouter = createBrowserRouter([
  { path: AppRoute.HOME, Component: HomePage },
  { path: AppRoute.SIGNUP, Component: SignupPage },
  { path: AppRoute.LOGIN, Component: LoginPage },
]);
