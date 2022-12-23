
import { Request, Response } from "express";
import { db } from "../db";
import { CreateProductBody, TypedRequest } from "./controllerTypes";

export const getProducts = (req: Request, res: Response) => {
  res.send("getting products");
};


export const createProduct = async (req: TypedRequest<CreateProductBody, any>, res: Response) => {
  const product = await db.product.create({
    data: req.body
  });
  
  res.status(201).json({successful: true, product});
};