import { Router } from 'express';
import { MembersController } from '@/controllers/members.controller';
import { ensureUserAuthentication } from '@/middlewares/ensure-user-authentication';
import { verifyUserAuthorization } from '@/middlewares/verify-user-authorization';

const membersRoutes = Router({ mergeParams: true });
const membersController = new MembersController();

membersRoutes.use(ensureUserAuthentication);

membersRoutes.post(
  '/:teamId',
  verifyUserAuthorization(['admin']),
  membersController.create,
);
membersRoutes.get(
  '/:teamId',
  verifyUserAuthorization(['admin', 'member']),
  membersController.index,
);
membersRoutes.delete(
  '/:id',
  verifyUserAuthorization(['admin']),
  membersController.delete,
);

export { membersRoutes };
