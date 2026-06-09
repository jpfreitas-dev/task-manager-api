import { prisma } from '@/database/prisma';

export class IndexTeamsService {
  async execute() {
    const teams = await prisma.team.findMany();
    return teams;
  }
}
