import { Injectable } from '@nestjs/common';
import { PrismaService } from './services/prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class AppService {
  public constructor(private prismaSvc: PrismaService) {}

  public getHello(): string {
    return 'Hello World!';
  }

  public async fetchUsers(): Promise<User[]> {
    // Fetch all the users from the database
    return await this.prismaSvc.user.findMany();
  }
}
