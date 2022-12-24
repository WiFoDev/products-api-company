import { Request, Response } from 'express';
import { db } from '../db';
import { TypedBodyRequest } from './types/request';
import { CreateProduct, UpdateProduct } from './types/product';

export const getProducts = async (req: Request, res: Response) => {
  const products = await db.product.findMany();
  res.json(products);
};

export const getProductById = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const product = await db.product.findFirstOrThrow({
      where: {
        id
      }
    });
    res.json(product);
  } catch (error) {
    res.status(404).json({ error });
  }
};

export const createProduct = async (
  req: TypedBodyRequest<CreateProduct>,
  res: Response
) => {
  try {
    const productData = CreateProduct.parse(req.body);
    const product = await db.product.create({
      data: productData
    });

    res.status(201).json({ status: 'success', data: product });
  } catch (error) {
    res.status(400).json({ status: 'fail', error });
  }
};

export const updateProduct = async (
  req: Request<{ id: string }, object, UpdateProduct, object>,
  res: Response
) => {
  try {
    const { id } = req.params;
    const productData = UpdateProduct.parse(req.body);
    const updatedProduct = await db.product.update({
      where: {
        id
      },
      data: {
        ...productData,
        updated_at: new Date()
      }
    });
    res.json(updatedProduct);
  } catch (error) {
    res.status(400).send(error);
  }
};

export const deleteProduct = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  const { id } = req.params;
  try {
    const deletedProduct = await db.product.delete({ where: { id } });
    res.json(deletedProduct);
  } catch (error) {
    res.status(400).json({ succesfull: false, error });
  }
};
