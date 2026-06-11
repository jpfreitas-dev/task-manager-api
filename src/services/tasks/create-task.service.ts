import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface CreateTaskServiceRequest {
  title: string;
  description: string;
  status?: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  teamId?: string;
  assignedTo?: string;
}

export class CreateTaskService {
  async execute({
    title,
    description,
    status,
    priority,
    teamId,
    assignedTo,
  }: CreateTaskServiceRequest) {
    const taskWithSameTitleInSameTeam = await prisma.task.findFirst({
      where: {
        title,
        teamId,
      },
    });

    if (taskWithSameTitleInSameTeam) {
      throw new AppError(
        'Task with same title already exists in this team',
        409,
      );
    }

    if (teamId) {
      const team = await prisma.team.findUnique({
        where: { id: teamId },
      });

      if (!team) {
        throw new AppError('Team not found', 404);
      }
    }

    if (assignedTo) {
      const user = await prisma.user.findUnique({
        where: { id: assignedTo },
      });

      if (!user) {
        throw new AppError('User not found', 404);
      }
    }

    if (teamId && assignedTo) {
      const teamMember = await prisma.teamMember.findFirst({
        where: {
          teamId,
          userId: assignedTo,
        },
      });

      if (!teamMember) {
        throw new AppError('User is not a member of the team', 400);
      }
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        status,
        priority,
        teamId,
        assignedTo,
      },
    });

    return task;
  }
}
