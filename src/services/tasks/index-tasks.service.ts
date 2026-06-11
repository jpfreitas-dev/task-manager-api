import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface IndexTasksServiceRequest {
  status?: string;
  priority?: string;
  teamId?: string;
  showMyTasks?: boolean;
  userId: string;
  role: string;
}

export class IndexTasksService {
  async execute({
    status,
    priority,
    teamId,
    showMyTasks,
    userId,
    role,
  }: IndexTasksServiceRequest) {
    const memberFilter: any = {};
    const adminFilter: any = {};

    if (status) {
      memberFilter.status = status;
      adminFilter.status = status;
    }

    if (priority) {
      memberFilter.priority = priority;
      adminFilter.priority = priority;
    }

    if (teamId) {
      adminFilter.teamId = teamId;
    }

    if (role == 'member') {
      const teamMember = await prisma.teamMember.findFirst({
        where: { userId }, 
      });

      if (!teamMember) {
        throw new AppError('You are not a member of any team', 403);
      }

      if (showMyTasks) {
        memberFilter.assignedTo = userId;
      } else {
        memberFilter.teamId = teamMember.teamId;
      }
    }

    let tasks: any = [];
    if (role == 'admin') {
      tasks = await prisma.task.findMany({
        where: adminFilter,
      });
    } else {
      tasks = await prisma.task.findMany({
        where: memberFilter,
      });
    }

    return tasks;
  }
}
