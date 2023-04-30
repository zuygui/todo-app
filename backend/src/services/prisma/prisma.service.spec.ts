import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

import { User } from '@prisma/client';

const users: User[] = [
  { id: 1, email: 'toto@tata.com', name: 'todo' },
  { id: 2, email: 'lolo@lala.com', name: 'lolo' },
];

describe('PrismaService', () => {
  let service: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrismaService],
    }).compile();

    service = module.get<PrismaService>(PrismaService);

    await service.user.deleteMany();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should process a transaction', async () => {
    const result = await service.user.findMany();

    expect(result.length).toBe(0);

    for (const u of users) {
      await service.user.create({
        data: u,
      });
    }

    const result2 = await service.user.findMany();

    expect(result2.length).toBe(2);
    expect(result2).toEqual(users);
  });

  afterEach(async () => {
    await service.user.deleteMany();
  });
});
