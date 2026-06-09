import { Router } from 'express';

import { usersRoutes } from './users.routes';
import { sessionsRoutes } from './sessions.routes';
import { teamsRoutes } from './teams.routes';
import { membersRoutes } from './members.routes';

const routes = Router();

routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRoutes);
routes.use('/teams', teamsRoutes);
routes.use('/members', membersRoutes);

export { routes };
