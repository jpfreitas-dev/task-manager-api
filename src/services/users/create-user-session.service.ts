import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';
import { compare } from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { authConfig } from '@/config/auth';

interface CreateUserSessionServiceRequest {
  email: string;
  password: string;
}

export class CreateUserSessionService {
  async execute({ email, password }: CreateUserSessionServiceRequest) {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new AppError('Invalid email or password', 401);
    }

    const passwordMatched = await compare(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Invalid email or password', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = jwt.sign({ role: user.role }, secret, {
      subject: user.id,
      expiresIn,
    });

    const { password: _, ...userWithoutPassword } = user;

    return { token, user: userWithoutPassword };
  }
}
