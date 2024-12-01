import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs } from 'src/configuration/envs';
import { NATS_SERVICE } from 'src/configuration/services';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: { servers: envs.NAT_SERVERS },
      },
    ]),
  ],
  exports: [
    ClientsModule.register([
      {
        name: NATS_SERVICE,
        transport: Transport.NATS,
        options: { servers: envs.NAT_SERVERS },
      },
    ]),
  ],
})
export class NatsModule {}
