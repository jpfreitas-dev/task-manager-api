import { Request, Response, NextFunction } from 'express';
import { AppError } from '@/utils/AppError';
import { ZodError } from 'zod';
import { z } from 'zod';

function errorHandlingMiddleware(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      message: error.message,
    });
  }

  if (error instanceof ZodError) {
    return res.status(400).json({
      message: 'Validation error',
      errors: z.treeifyError(error),
    });
  }

  return res.status(500).json({
    message: 'Internal server error',
  });
}

export { errorHandlingMiddleware };
