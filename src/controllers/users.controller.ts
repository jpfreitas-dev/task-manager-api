import { Request, Response } from 'express';
import { z } from 'zod';
import CreateUserService from '@/services/users/create-user.service';

class UsersController {
  async create(req: Request, res: Response) {
    const createUserSchema = z.object({
      name: z.string().min(3),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = createUserSchema.parse(req.body);

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    return res.status(201).json(user);
  }
}

export default UsersController;
