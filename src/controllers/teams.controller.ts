import { Request, Response } from 'express';
import { z } from 'zod';
import { CreateTeamService } from '@/services/teams/create-team.service';
import { IndexTeamsService } from '@/services/teams/index-teams.service';
import { UpdateTeamService } from '@/services/teams/update-team.service';
import { DeleteTeamService } from '@/services/teams/delete-team.service';

export class TeamsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().min(2),
      description: z.string().min(10),
    });

    const { name, description } = bodySchema.parse(req.body);

    const createTeamService = new CreateTeamService();
    const team = await createTeamService.execute({
      name,
      description,
    });

    return res.status(201).json(team);
  }

  async index(req: Request, res: Response) {
    const indexTeamsService = new IndexTeamsService();
    const teams = await indexTeamsService.execute();
    return res.json(teams);
  }

  async update(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const bodySchema = z.object({
      name: z.string().optional(),
      description: z.string().optional(),
    });

    const { id } = paramsSchema.parse(req.params);
    const { name, description } = bodySchema.parse(req.body);

    const updateTeamService = new UpdateTeamService();
    const team = await updateTeamService.execute({
      id,
      name,
      description,
    });

    return res.json(team);
  }

  async delete(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.uuid(),
    });

    const { id } = paramsSchema.parse(req.params);

    const deleteTeamService = new DeleteTeamService();
    await deleteTeamService.execute({ id });

    return res.status(204).send();
  }
}
