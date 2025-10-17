import { z } from "zod";
import { UserRole } from "../../domain/entity/auth-user";

export const SellerCreateSchema = z.object({
  fullname: z.string().nonempty("fullname is required"),
  profile_picture_url: z.string().nonempty("profile_picture_url is required"),
});

// Schema for update (all fields optional, partial)
export const SellerUpdateSchema = SellerCreateSchema.partial();
