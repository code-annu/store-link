import z from "zod";

export const DeliveryPartnerCreateSchema = z.object({
  fullname: z.string().nonempty({ error: "fullname is required" }).max(100),
  profile_picture_url: z
    .string()
    .nonempty({ error: "profile_picture_url is required" }),
});

export const DeliveryPartnerUpdateSchema =
  DeliveryPartnerCreateSchema.partial().extend({
    is_active: z.boolean().optional(),
  });
