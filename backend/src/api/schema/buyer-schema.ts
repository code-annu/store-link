import {z} from "zod";

export const BuyerCreateProfileSchema = z.object({
    fullname: z.string().nonempty("fullname is required"),
    address: z.string().nonempty("address is required"),
    profile_picture_url: z.string().nonempty("profile_picture_url is required"),
});

// Schema for update (all fields optional, partial)
export const BuyerUpdateProfileSchema = BuyerCreateProfileSchema.partial().extend(
    {has_subscription: z.boolean().optional()}
);