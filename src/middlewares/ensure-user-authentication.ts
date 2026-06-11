import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

import { authConfig } from '@/config/auth';
import { AppError } from '@/utils/app-error';

interface TokenPayload {
  role: string;
  sub: string;
}

export function ensureUserAuthentication(
  request: Request,
  response: Response,
  next: NextFunction,
) {
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret) as TokenPayload;

    const { role, sub: user_id } = decoded;

    request.user = {
      id: user_id,
      role,
    };

    return next();
  } catch (error) {
    throw new AppError('Invalid JWT token', 401);
  }
}
