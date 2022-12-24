import { NextFunction, Response } from 'express';
import { TokenNotProvidedException } from '../Exceptions/TokenNotProvidedException';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import { db } from '../db';
import { Payload } from './types/Payload';
import { AuthRequest } from './types/AuthRequest';
import { UserNotFoundException } from '../Exceptions/UserNotFoundException';
import { Role } from '@prisma/client';
import { NotAuthorizedException } from '../Exceptions/NotAuthorizedException';

export const verifyToken = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const bearerSchema = req.headers['authorization'];
    if (!bearerSchema) throw new TokenNotProvidedException();
    const token = bearerSchema.split(' ')[1];
    const payload = verify(token, jwtConfig.secret) as Payload;
    req.id = payload.id;
    const user = await db.user.findUnique({
      where: { id: payload.id },
      select: {
        email: true
      }
    });
    if (!user) throw new UserNotFoundException();
    next();
  } catch (error) {
    if (
      error instanceof TokenNotProvidedException ||
      error instanceof JsonWebTokenError ||
      error instanceof UserNotFoundException
    ) {
      res.status(401).json({ status: 'fail', error: error.message });
    } else {
      res.status(500).json({ status: 'fail', error });
    }
  }
};

export const isAdmin = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.id },
      select: { role: true }
    });
    if (user?.role !== Role.ADMIN) throw new NotAuthorizedException();
    next();
  } catch (error) {
    if (error instanceof NotAuthorizedException) {
      res.status(403).json({ status: 'fail', error: error.message });
    } else {
      res.status(500).json({ status: 'fail', error });
    }
  }
};
