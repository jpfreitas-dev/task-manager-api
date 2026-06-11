import { Router } from 'express';
import { TasksController } from '@/controllers/tasks.controller';
import { ensureUserAuthentication } from '@/middlewares/ensure-user-authentication';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';

const tasksRoutes = Router({ mergeParams: true });
const tasksController = new TasksController();

tasksRoutes.use(ensureUserAuthentication);

tasksRoutes.post(
  '/',
  verifyUserAuthorization(['admin']),
  tasksController.create,
);
tasksRoutes.get(
  '/',
  verifyUserAuthorization(['admin', 'member']),
  tasksController.index,
);
tasksRoutes.put(
  '/:id',
  verifyUserAuthorization(['admin', 'member']),
  tasksController.update,
);
tasksRoutes.delete(
  '/:id',
  verifyUserAuthorization(['admin']),
  tasksController.delete,
);

export { tasksRoutes };
