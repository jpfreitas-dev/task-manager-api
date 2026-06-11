import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface ShowTaskHistoryServiceRequest {
  taskId: string;
}

export class ShowTaskHistoryService {
  async execute({ taskId }: ShowTaskHistoryServiceRequest) {
    const task = await prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    const history = await prisma.taskHistory.findMany({
      where: { taskId },
      orderBy: { changedAt: 'desc' },
    });

    return history;
  }
}
