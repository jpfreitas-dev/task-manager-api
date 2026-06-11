import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface UpdateTaskServiceRequest {
  id: string;
  title?: string;
  description?: string;
  teamId?: string;
  assignedTo?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'pending' | 'in_progress' | 'completed';
  userId: string;
  role: 'admin' | 'member';
}

export class UpdateTaskService {
  async execute({
    id,
    title,
    description,
    teamId,
    assignedTo,
    priority,
    status,
    userId,
    role,
  }: UpdateTaskServiceRequest) {
    const task = await prisma.task.findUnique({
      where: { id },
    });

    if (!task) {
      throw new AppError('Task not found', 404);
    }

    if (task.status === 'completed' && status && status !== 'completed') {
      throw new AppError(
        'Completed tasks cannot be updated to another status',
        400,
      );
    }

    let updateData: any = {};

    if (role === 'admin') {
      updateData = {
        title,
        description,
        teamId,
        assignedTo,
        priority,
        status,
      };
    } else if (role === 'member') {
      if (task.assignedTo !== userId) {
        throw new AppError('You are not the owner of this task', 403);
      }

      if (title || description || teamId || assignedTo || priority) {
        throw new AppError(
          'Members can only update the status of the task',
          403,
        );
      }

      updateData = { status };
    }

    const updatedTask = await prisma.task.update({
      where: { id },
      data: updateData,
    });

    if (status && status !== task.status) {
      await prisma.taskHistory.create({
        data: {
          taskId: id,
          oldStatus: task.status,
          newStatus: status,
        },
      });
    }

    return updatedTask;
  }
}
