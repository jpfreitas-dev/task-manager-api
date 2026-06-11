import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface DeleteTaskServiceRequest {
  id: string;
}

export class DeleteTaskService {
  async execute({ id }: DeleteTaskServiceRequest) {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    await prisma.task.delete({
      where: { id },
    });
  }
}
