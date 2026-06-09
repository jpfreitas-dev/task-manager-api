import { Router } from 'express';
import SessionsController from '@/controllers/sessions.controller';
import { ensureUserAuthentication } from '@/middlewares/ensure-user-authentication';

const sessionsRoutes = Router();
const sessionsController = new SessionsController();

sessionsRoutes.post('/', sessionsController.create);
sessionsRoutes.get(
  '/profile',
  ensureUserAuthentication,
  sessionsController.show,
);

export { sessionsRoutes };
