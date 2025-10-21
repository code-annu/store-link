import {z} from "zod";

export const StoreCreateSchema = z.object({
    name: z.string().nonempty("store_name is required").max(100),
    address: z.string().nonempty("store_address is required").max(200),
    description: z.string().max(500).nonempty("store_description is required"),
    image_url: z.string().nonempty("store_image_url is required"),
});

export const StoreUpdateSchema = StoreCreateSchema.partial();