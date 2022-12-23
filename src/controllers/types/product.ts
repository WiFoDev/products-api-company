import { z } from 'zod';

export const CreateProduct = z.object({
  name: z.string(),
  category: z.string(),
  imgURL: z.string(),
  price: z.number()
});

export const UpdateProduct = z.object({
  name: z.string().optional(),
  category: z.string().optional(),
  imgURL: z.string().optional(),
  price: z.number().optional()
});

export interface GetProductByIdParam {
  id: string;
}

export type CreateProduct = z.infer<typeof CreateProduct>;
export type UpdateProduct = z.infer<typeof UpdateProduct>;
