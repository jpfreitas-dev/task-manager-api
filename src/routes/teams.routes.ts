import { Router } from 'express';
import { TeamsController } from '@/controllers/teams.controller';
import { ensureUserAuthentication } from '@/middlewares/ensure-user-authentication';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';

const teamsRoutes = Router();
const teamsController = new TeamsController();

teamsRoutes.use(ensureUserAuthentication);
teamsRoutes.use(verifyUserAuthorization(['admin']));

teamsRoutes.post('/', teamsController.create);
teamsRoutes.get('/', teamsController.index);
teamsRoutes.put('/:id', teamsController.update);
teamsRoutes.delete('/:id', teamsController.delete);

export { teamsRoutes };
