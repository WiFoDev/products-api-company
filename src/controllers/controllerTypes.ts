import { Request } from 'express';
import { Query } from 'express-serve-static-core';
import { z } from 'zod';

export interface TypedBodyRequest<T> extends Request {
  body: T;
}

export interface TypedQueryRequest<T extends Query> extends Request {
  query: T;
}

export interface TypedParamRequest<T> {
  params: T;
}

export interface TypedRequest<T, U extends Query> extends Request {
  body: T;
  query: U;
}

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

export type CreateProduct = z.infer<typeof CreateProduct>;
export type UpdateProduct = z.infer<typeof UpdateProduct>;

export interface GetProductByIdParam {
  id: string;
}
