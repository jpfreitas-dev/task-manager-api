import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface ShowUserProfileServiceRequest {
  userId: string;
}

export class ShowUserProfileService {
  async execute({ userId }: ShowUserProfileServiceRequest) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    };
  }
}
