import { Handler } from 'express';
import { TokenNotProvidedException } from '../Exceptions/TokenNotProvidedException';
import { JsonWebTokenError, verify } from 'jsonwebtoken';
import jwtConfig from '../config/jwtConfig';
import { db } from '../db';
import { Payload } from './types/Payload';
import { UserNotFoundException } from '../Exceptions/UserNotFoundException';
import { Role } from '@prisma/client';
import { NotAuthorizedException } from '../Exceptions/NotAuthorizedException';

export const verifyToken: Handler = async (req, res, next) => {
  try {
    const bearerSchema = req.headers['authorization'];
    if (!bearerSchema) throw new TokenNotProvidedException();
    const token = bearerSchema.split(' ')[1];
    const payload = verify(token, jwtConfig.secret) as Payload;
    req.params.id = payload.id;
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

export const isAdmin: Handler = async (req, res, next) => {
  try {
    const user = await db.user.findUnique({
      where: { id: req.params.id },
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
