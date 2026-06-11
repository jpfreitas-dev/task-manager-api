import { Request, Response } from 'express';
import { z } from 'zod';
import { ShowTaskHistoryService } from '@/services/tasks/show-task-history.service';

export class TaskHistoryController {
  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const showTaskHistoryService = new ShowTaskHistoryService();
    const history = await showTaskHistoryService.execute({ taskId: id });

    return res.json(history);
  }
}
