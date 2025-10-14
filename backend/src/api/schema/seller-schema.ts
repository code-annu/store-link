import { z } from "zod";
import { UserRole } from "../../domain/entity/auth-user";

// First, a schema for the common “base” fields
const SellerBase = z.object({
  uid: z.string().nonempty("uid is required"),
  fullname: z.string().nonempty("fullname is required"),
  profile_picture_url: z.string().url("Must be a valid URL"),
  role: z.enum(UserRole), // or z.enum([...]) depending on how UserRole is defined
});

// Schema for creation (must include all required fields for create)
export const SellerCreateSchema = z.object({
  fullname: z.string().nonempty("fullname is required"),
  profile_picture_url: z.string().nonempty("profile_picture_url is required"),
});

// Schema for update (all fields optional, partial)
export const SellerUpdateSchema = SellerCreateSchema.partial();
