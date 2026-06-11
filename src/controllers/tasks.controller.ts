import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateTaskService } from '@/services/tasks/create-task.service';
import { IndexTasksService } from '@/services/tasks/index-tasks.service';
import { UpdateTaskService } from '@/services/tasks/update.task.service';
import { DeleteTaskService } from '@/services/tasks/delete-task.service';

export class TasksController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z.string().min(5).max(80),
      description: z.string(),
      status: z.enum(['pending', 'in_progress', 'completed']).optional(),
      priority: z.enum(['low', 'medium', 'high']),
      teamId: z.uuid().optional(),
      assignedTo: z.uuid().optional(),
    });

    const { title, description, status, priority, teamId, assignedTo } =
      bodySchema.parse(req.body);

    const createTaskService = new CreateTaskService();
    const task = await createTaskService.execute({
      title,
      description,
      status,
      priority,
      teamId,
      assignedTo,
    });

    return res.status(201).json(task);
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      status: z.enum(['pending', 'in_progress', 'completed']).optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      teamId: z.uuid().optional(),
      assignedTo: z.uuid().optional(),
      showMyTasks: z
        .string()
        .optional()
        .transform((value) => value === 'true'),
    });

    const { status, priority, teamId, assignedTo, showMyTasks } =
      querySchema.parse(req.query);
    const { id: userId, role } = req.user;

    const indexTasksService = new IndexTasksService();
    const tasks = await indexTasksService.execute({
      status,
      priority,
      teamId,
      assignedTo,
      showMyTasks,
      userId,
      role,
    });

    return res.json(tasks);
  }

  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const bodySchema = z.object({
      title: z.string().min(5).max(80).optional(),
      description: z.string().optional(),
      teamId: z.uuid().optional(),
      assignedTo: z.uuid().optional(),
      priority: z.enum(['low', 'medium', 'high']).optional(),
      status: z.enum(['pending', 'in_progress', 'completed']).optional(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { title, description, teamId, assignedTo, priority, status } =
      bodySchema.parse(req.body);
    const { id: userId, role } = req.user;

    const updateTaskService = new UpdateTaskService();
    const task = await updateTaskService.execute({
      id,
      title,
      description,
      teamId,
      assignedTo,
      priority,
      status,
      userId,
      role,
    });

    return res.json(task);
  }

  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const deleteTaskService = new DeleteTaskService();
    await deleteTaskService.execute({ id });

    return res.status(204).send();
  }
}
