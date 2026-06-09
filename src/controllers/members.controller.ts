import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateMemberService } from '@/services/members/create-member.service';
import { IndexMembersService } from '@/services/members/index-members.service';
import { DeleteMemberService } from '@/services/members/delete-member.service';

export class MembersController {
  async create(req: Request, res: Response) {
    const paramsSchema = z.object({
      teamId: z.uuid(),
    });

    const bodySchema = z.object({
      userId: z.uuid(),
    });

    const { teamId } = paramsSchema.parse(req.params);
    const { userId } = bodySchema.parse(req.body);

    const createMemberService = new CreateMemberService();
    const member = await createMemberService.execute({
      teamId,
      userId,
    });

    return res.status(201).json(member);
  }

  async index(req: Request, res: Response) {
    const paramsSchema = z.object({
      teamId: z.uuid(),
    });

    const { teamId } = paramsSchema.parse(req.params);

    const indexMembersService = new IndexMembersService();
    const members = await indexMembersService.execute({ teamId });

    return res.json(members);
  }

  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const deleteMemberService = new DeleteMemberService();
    const member = await deleteMemberService.execute({
      id,
    });

    return res.status(201).json(member);
  }
}
