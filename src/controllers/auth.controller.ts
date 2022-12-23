import { Response } from 'express';
import { db } from '../db';
import { UserExistsException } from '../Exceptions/UserExistException';
import { comparePassword, hashPassword } from '../utils/password';
import { LoginUser, RegisterUser } from './types/auth';
import { TypedBodyRequest } from './types/request';
import { sign } from 'jsonwebtoken';
import { UserNotFoundException } from '../Exceptions/UserNotFoundException';
import { InvalidPasswordException } from '../Exceptions/InvalidPasswordException';
import jwtConfig from '../config/jwtConfig';

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
    if (userFound) throw new UserExistsException();
    const hashedPassword = await hashPassword(draft.password);
    const registerUser: RegisterUser = {
      ...draft,
      password: hashedPassword
    };
    const user = await db.user.create({
      data: registerUser
    });

    const token = sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: 8400
    });
    res.status(201).json({
      status: 'success',
      data: {
        token
      }
    });
  } catch (error) {
    if (error instanceof UserExistsException) {
      res.status(400).json({ status: 'fail', error: error.message });
    } else {
      res.status(500).json({
        status: 'fail',
        error
      });
    }
  }
};
export const login = async (
  req: TypedBodyRequest<LoginUser>,
  res: Response
) => {
  try {
    const loginData = LoginUser.parse(req.body);
    const user = await db.user.findUnique({
      where: {
        email: loginData.email
      }
    });
    if (!user) throw new UserNotFoundException();
    const isPasswordValid = await comparePassword(
      loginData.password,
      user.password
    );
    if (!isPasswordValid) throw new InvalidPasswordException();
    const token = sign({ id: user.id }, jwtConfig.secret, {
      expiresIn: '1 day',
      algorithm: 'HS256'
    });
    res.send({
      status: 'success',
      data: {
        token
      }
    });
  } catch (error) {
    if (error instanceof UserNotFoundException) {
      res.status(404).json({ status: 'fail', error: error.message });
    } else if (error instanceof InvalidPasswordException) {
      res.status(401).json({ status: 'fail', error: error.message });
    } else {
      res.status(500).json({ status: 'fail', error });
    }
  }
};
