import { prisma } from '@/database/prisma';
import { AppError } from '@/utils/app-error';

interface DeleteMemberServiceRequest {
  id: string;
}

export class DeleteMemberService {
  async execute({ id }: DeleteMemberServiceRequest) {
    const member = await prisma.teamMember.findUnique({
      where: { id },
    });

    if (!member) {
      throw new AppError('Member not found', 404);
    }

    await prisma.teamMember.delete({
      where: { id },
    });
  }
}
