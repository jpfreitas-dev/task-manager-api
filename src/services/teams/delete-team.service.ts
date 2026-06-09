import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface DeleteTeamServiceRequest {
  id: string;
}

export class DeleteTeamService {
  async execute({ id }: DeleteTeamServiceRequest) {
    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new AppError('Team not found', 404);
    }

    await prisma.team.delete({
      where: { id },
    });
  }
}
