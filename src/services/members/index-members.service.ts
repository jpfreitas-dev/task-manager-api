import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface IndexMembersServiceRequest {
  teamId: string;
}

export class IndexMembersService {
  async execute({ teamId }: IndexMembersServiceRequest) {
    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new AppError('Team not found', 404);
    }

    const members = await prisma.teamMember.findMany({
      where: { teamId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
    });

    return members;
  }
}
