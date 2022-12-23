
import { Request, Response } from "express";
import { db } from "../db";
import { CreateProductBody, GetProductByIdParam, TypedBodyRequest, TypedParamRequest, TypedRequest } from "./controllerTypes";

export const getProducts = async (req: Request, res: Response) => {
  const products = await db.product.findMany();
  res.json(products);
};


export const createProduct = async (req: TypedBodyRequest<CreateProductBody>, res: Response) => {
  const product = await db.product.create({
    data: req.body
  });
  
  res.status(201).json({successful: true, product});
};

export const getProductById = async (req: TypedParamRequest<GetProductByIdParam>, res: Response) => {
  const {id} = req.params;
  try {
    const product = await db.product.findFirstOrThrow({
      where: {
        id
      }
    });
    res.json(product);
  } catch {
    res.status(404).json({error: `Product ${id} not found`});
  }
};