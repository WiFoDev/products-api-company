import { Request, Response } from 'express';
import { db } from '../db';
import { RegisterUser } from './types/auth';
import { TypedBodyRequest } from './types/request';

export const register = async (
  req: TypedBodyRequest<RegisterUser>,
  res: Response
) => {
  try {
    const registerUser = RegisterUser.parse(req.body);
    await db.user.create({
      data: registerUser
    });
    res.send('register');
  } catch (error) {}
};
export const login = (req: Request, res: Response) => {
  res.send('login...');
};
