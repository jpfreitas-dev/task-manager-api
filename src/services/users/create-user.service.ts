import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';
import { hash } from 'bcryptjs';

interface CreateUserServiceRequest {
  name: string;
  email: string;
  password: string;
}

export class CreateUserService {
  async execute({ name, email, password }: CreateUserServiceRequest) {
    const userAlreadyExists = await prisma.user.findUnique({
      where: { email },
    });

    if (userAlreadyExists) {
      throw new AppError('User already exists', 409);
    }

    const hashedPassword = await hash(password, 6);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  }
}

export default CreateUserService;
