import { z } from "zod";
import { ProductCategory } from "../../domain/entity/product";

export const ProductCreateSchema = z.object({
  name: z.string().nonempty("product name is required").max(200),
  price: z
    .number({
      error: "price must be a number",
    })
    .nonnegative("price cannot be negative"),
  image_url: z.string().nonempty("image_url is required"),
  description: z.string().nonempty("description is required").max(1000),
  category: z.enum(ProductCategory, { error: "category is required" }),
});

export const ProductUpdateSchema = ProductCreateSchema.partial();
