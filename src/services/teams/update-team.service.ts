import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface UpdateTeamServiceRequest {
  id: string;
  name?: string;
  description?: string;
}

export class UpdateTeamService {
  async execute({ id, name, description }: UpdateTeamServiceRequest) {
    const team = await prisma.team.findUnique({
      where: { id },
    });

    if (!team) {
      throw new AppError('Team not found', 404);
    }

    if (!name && !description) {
      throw new AppError(
        'At least one field (name or description) must be provided for update',
        400,
      );
    }

    if (name) {
      const teamWithSameName = await prisma.team.findUnique({
        where: { name },
      });

      if (teamWithSameName && teamWithSameName.id !== id) {
        throw new AppError(
          'Another team with the same name already exists',
          409,
        );
      }
    }

    const updatedTeam = await prisma.team.update({
      where: { id },
      data: {
        name,
        description,
      },
    });

    return updatedTeam;
  }
}
