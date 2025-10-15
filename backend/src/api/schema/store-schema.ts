import { z } from "zod";


export const StoreCreateSchema = z.object({
  store_name: z.string().nonempty("store_name is required").max(100),
  store_address: z.string().nonempty("store_address is required").max(200),
  store_description: z
    .string()
    .max(500)
    .nonempty("store_description is required"),
  store_image_url: z.string().nonempty("store_image_url is required"),
});

export const StoreUpdateSchema = StoreCreateSchema.partial();


