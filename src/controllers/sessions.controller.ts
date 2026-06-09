import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserSessionService } from '@/services/users/create-user-session.service';
import { ShowUserProfileService } from '@/services/users/show-user-profile.service';

export class SessionsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      email: z.email(),
      password: z.string().min(6),
    });

    const { email, password } = bodySchema.parse(req.body);

    const createSessionService = new CreateUserSessionService();
    const { token, user } = await createSessionService.execute({
      email,
      password,
    });

    return res.json({ token, user });
  }

  async show(req: Request, res: Response) {
    const { user } = req;

    const showUserProfileService = new ShowUserProfileService();
    const userProfile = await showUserProfileService.execute({
      userId: user.id,
    });

    return res.status(200).json(userProfile);
  }
}

export default SessionsController;
