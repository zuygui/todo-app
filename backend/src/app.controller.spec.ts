import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma/prisma.service';

import { mockDeep, DeepMockProxy, mockReset } from 'jest-mock-extended';

import { User } from '@prisma/client';

const users: User[] = [
  { id: 1, email: 'toto@tata.com', name: 'toto' },
  { id: 2, email: 'lolo@lala.com', name: 'lolo' },
];

describe('AppController', () => {
  let appController: AppController;
  let prismaMock: DeepMockProxy<PrismaService>;

  beforeEach(async () => {
    // Reset mock before each test
    if (prismaMock) mockReset(prismaMock);

    // Create a new module with the AppController
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, PrismaService],
    })
      .overrideProvider(PrismaService)
      .useValue(mockDeep<PrismaService>())
      .compile();

    // Get the AppController instance
    appController = app.get<AppController>(AppController);
    // Get the mocked PrismaService instance
    prismaMock = app.get(PrismaService);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('users', () => {
    it('should return a list of users', async () => {
      // Mock the PrismaService to return a list of users
      prismaMock.user.findMany.mockResolvedValue(users);

      expect(await appController.getUsers()).toEqual(users);
    });
  });
});
