import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateUserService } from '@/services/users/create-user.service';

export class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(3),
      email: z.email(),
      password: z.string().min(6),
    });

    const { name, email, password } = bodySchema.parse(req.body);

    const createUserService = new CreateUserService();
    const user = await createUserService.execute({ name, email, password });

    return res.status(201).json(user);
  }
}
