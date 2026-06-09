import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface CreateMemberServiceRequest {
  userId: string;
  teamId: string;
}

export class CreateMemberService {
  async execute({ userId, teamId }: CreateMemberServiceRequest) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new AppError('User not found', 404);
    }

    const team = await prisma.team.findUnique({
      where: { id: teamId },
    });

    if (!team) {
      throw new AppError('Team not found', 404);
    }

    const memberAlreadyExists = await prisma.teamMember.findFirst({
      where: {
        teamId: teamId,
        userId: userId,
      },
    });

    if (memberAlreadyExists) {
      throw new AppError('Member already exists in this team', 409);
    }

    const member = await prisma.teamMember.create({
      data: {
        userId,
        teamId,
      },
    });

    return member;
  }
}
