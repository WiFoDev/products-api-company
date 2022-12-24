import { Request } from 'express';
import { Query } from 'express-serve-static-core';

export interface TypedBodyRequest<T> extends Request {
  body: T;
}

export interface TypedQueryRequest<T extends Query> extends Request {
  query: T;
}
