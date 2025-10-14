import z from "zod";
import { UserRole } from "../../domain/entity/auth-user";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const signupSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(emailRegex, "Email must be a valid email address"),
  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters long"),
  role: z.enum(UserRole, {
    error: "Please specify User role from [buyer, seller, delivery_agent]",
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, "Email is required")
    .regex(emailRegex, "Email must be a valid email address"),
  password: z.string().trim().min(1, "Password is required"),
});

export const refreshTokenSchema = z.object({
  refresh_token: z.string().min(1, "Refresh token is required").trim(),
});
