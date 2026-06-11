import { Router } from 'express';
import { TaskHistoryController } from '@/controllers/task-history.controller';
import { ensureUserAuthentication } from '@/middlewares/ensure-user-authentication';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';

const taskHistoryRoutes = Router();
const taskHistoryController = new TaskHistoryController();

taskHistoryRoutes.use(ensureUserAuthentication);
taskHistoryRoutes.use(verifyUserAuthorization(['admin', 'member']));

taskHistoryRoutes.get('/:id', taskHistoryController.show);

export { taskHistoryRoutes };
