import { prisma } from '@/database/prisma';
import CreateUserService from './create-user.service';

describe('CreateUserService', () => {
  let userId: string;

  afterAll(async () => {
    await prisma.user.deleteMany({
      where: { id: userId },
    });
    await prisma.$disconnect();
  });

  it('should be able to create a new user', async () => {
    const createUserService = new CreateUserService();

    const user = await createUserService.execute({
      name: 'joaopaulo',
      email: 'joaopaulo@example.com',
      password: 'password123',
    });

    expect(user).toHaveProperty('id');
    expect(user.name).toBe('joaopaulo');
    expect(user.email).toBe('joaopaulo@example.com');
    expect(user).not.toHaveProperty('password');

    userId = user.id;
  });
});
