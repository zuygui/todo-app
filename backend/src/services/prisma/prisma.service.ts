import { INestApplication, Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger(PrismaService.name);

  public async onModuleInit(): Promise<void> {
    await this.$connect().then(() => {
      this.logger.log('Prisma connected');
    });
  }

  public enableShutdownHooks(app: INestApplication): void {
    this.$on('beforeExit', () => {
      const handler = async (): Promise<void> => await app.close();

      handler().catch(error => {
        this.logger.error(error);
        process.exit(1);
      });
    });
  }
}
