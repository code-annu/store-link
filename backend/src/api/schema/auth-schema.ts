import z from "zod";
import {UserRole} from "../../domain/entity/user";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const SignupSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .regex(emailRegex, "Email must be a valid email address"),
    password: z
        .string()
        .trim()
        .nonempty("Password must be at least 6 characters long"),
    role: z.enum(UserRole).nonoptional("Pick a user role from [seller, buyer, delivery_partner]"),
});

export const LoginSchema = z.object({
    email: z
        .string()
        .trim()
        .nonempty("Email is required")
        .regex(emailRegex, "Email must be a valid email address"),
    password: z.string().trim().nonempty("Password is required"),
});

export const RefreshTokenSchema = z.object({
    refresh_token: z.string().min(1, "Refresh token is required").trim(),
});