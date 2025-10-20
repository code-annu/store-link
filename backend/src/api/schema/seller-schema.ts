import z from "zod";

export const SellerCreateSchema = z.object({
    fullname: z.string().nonempty("fullname is required").max(100, 'Fullname is cannot exceed the length of 100'),
    profile_picture_url: z.string().nonempty("profile_picture_url is required"),
});

export const SellerUpdateSchema = z.object({
    fullname: z.string().max(100, 'Fullname is cannot exceed the length of 100').optional(),
    profile_picture_url: z.string().nonempty("profile_picture_url is required").optional(),
    verified: z.boolean().optional(),
});