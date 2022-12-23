
import { Request, Response } from "express";
import { db } from "../db";
import { CreateProductBody, TypedRequest } from "./controllerTypes";

export const getProducts = async (req: Request, res: Response) => {
  const products = await db.product.findMany();
  res.json(products);
};


export const createProduct = async (req: TypedRequest<CreateProductBody, any>, res: Response) => {
  const product = await db.product.create({
    data: req.body
  });
  
  res.status(201).json({successful: true, product});
};