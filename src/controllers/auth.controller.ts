import { Request, Response } from 'express';
import { db } from '../db';
import { USerExistsException } from '../Exceptions/UserExistException';
import { hashPassword } from '../utils/password';
import { RegisterUser } from './types/auth';
import { TypedBodyRequest } from './types/request';

export const register = async (
  req: TypedBodyRequest<RegisterUser>,
  res: Response
) => {
  try {
    const draft = RegisterUser.parse(req.body);

    const userFound = await db.user.findFirst({
      where: {
        OR: [
          {
            username: draft.username
          },
          {
            email: draft.email
          }
        ]
      }
    });
    if (userFound) throw new USerExistsException('User already exists');
    const hashedPassword = await hashPassword(draft.password);
    const registerUser: RegisterUser = {
      ...draft,
      password: hashedPassword
    };
    const user = await db.user.create({
      data: registerUser
    });
    res.status(201).json({
      status: 'success',
      data: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error instanceof USerExistsException) {
      res.status(400).json({ status: 'fail', error: error.message });
    } else {
      res.status(500).json({
        status: 'fail',
        error
      });
    }
  }
};
export const login = (req: Request, res: Response) => {
  res.send('login...');
};
