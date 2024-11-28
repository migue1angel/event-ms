import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { envs } from './configuration/envs';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('EventsMS main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.NATS,
      options: {
        servers: envs.NAT_SERVERS,
      },
    },
  );
  await app.listen();
  logger.log(`EventsMS is running on port ${envs.PORT}`);
}
bootstrap();
