import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface IndexTasksServiceRequest {
  status?: string;
  priority?: string;
  teamId?: string;
  assignedTo?: string;
  showMyTasks?: boolean;
  userId: string;
  role: string;
}

export class IndexTasksService {
  async execute({
    status,
    priority,
    teamId,
    assignedTo,
    showMyTasks,
    userId,
    role,
  }: IndexTasksServiceRequest) {
    const where: any = {};

    // 1. Filtros comuns (Valem para Admin e para Membro)
    if (status) {
      where.status = status;
    }

    if (priority) {
      where.priority = priority;
    }

    // 2. Regras específicas para o cargo de MEMBER
    if (role === 'member') {
      const teamMember = await prisma.teamMember.findFirst({
        where: { userId },
      });

      if (!teamMember) {
        throw new AppError('You are not a member of any team', 403);
      }

      where.teamId = teamMember.teamId;

      if (showMyTasks) {
        where.assignedTo = userId;
      }
    }

    if (role === 'admin') {
      if (teamId) {
        where.teamId = teamId;
      }

      if (assignedTo) {
        where.assignedTo = assignedTo;
      }

      if (showMyTasks) {
        where.assignedTo = userId;
      }
    }

    const tasks = await prisma.task.findMany({
      where: where,
    });

    return tasks;
  }
}
