import { Request } from "express";
import {Query} from "express-serve-static-core";

export interface TypedRequest<T, U extends Query> extends Request {
  body: T,
  query: U
}

export interface CreateProductBody {
  name: string,
  category: string,
  imgURL: string,
  price: number
}