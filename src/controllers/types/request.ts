import { Request } from 'express';
import { Query } from 'express-serve-static-core';

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
