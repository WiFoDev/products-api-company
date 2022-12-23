
import { Request, Response } from "express";
import { db } from "../db";
import { CreateProductBody, GetProductByIdParam, TypedBodyRequest, TypedParamRequest, TypedRequest } from "./controllerTypes";

export const getProducts = async (req: Request, res: Response) => {
  const products = await db.product.findMany();
  res.json(products);
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
  } catch (error) {
    res.status(404).json({error});
  }
};

export const createProduct = async (req: TypedBodyRequest<CreateProductBody>, res: Response) => {
  const product = await db.product.create({
    data: req.body
  });
  
  res.status(201).json({successful: true, product});
};

export const updateProduct = async (req: Request<GetProductByIdParam, object, Partial<CreateProductBody>,object>, res: Response) =>{
  const {id} = req.params;
  try {
    const updatedProduct = await db.product.update({
      where: {
        id
      },
      data: {
        ...req.body,
        updated_at: new Date()
      }
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(500).send(error);
  }
};
