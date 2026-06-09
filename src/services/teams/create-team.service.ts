import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface CreateTeamServiceRequest {
  name: string;
  description: string;
}

export class CreateTeamService {
  async execute({ name, description }: CreateTeamServiceRequest) {
    const teamAlreadyExists = await prisma.team.findUnique({
      where: { name },
    });

    if (teamAlreadyExists) {
      throw new AppError('Team already exists', 409);
    }

    const team = await prisma.team.create({
      data: {
        name,
        description,
      },
    });

    return team;
  }
}
