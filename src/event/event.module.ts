import { Global, Module } from '@nestjs/common';
import { coreProviders } from './providers';
import { DatabaseModule } from 'src/database/database.module';
import {
  AddressesController,
  CataloguesController,
  EventsController,
  FilesController,
  RegistrationsController,
  SponsorsController,
  TicketTypesController,
  TicketsController,
} from './controllers';
import {
  AddressesService,
  CloudinaryService,
  RegistrationsService,
  SponsorsService,
  TicketsService,
  TicketTypesService,
  FilesService,
  CataloguesService,
  EventsService,
} from './services';
import { NatsModule } from 'src/transports/nats.module';

@Module({
  imports: [DatabaseModule, NatsModule],
  controllers: [
    AddressesController,
    CataloguesController,
    EventsController,
    FilesController,
    RegistrationsController,
    SponsorsController,
    TicketTypesController,
    TicketsController,
  ],
  providers: [
    ...coreProviders,
    AddressesService,
    CataloguesService,
    EventsService,
    CloudinaryService,
    RegistrationsService,
    SponsorsService,
    TicketTypesService,
    TicketsService,
    FilesService,
  ],
  exports: [...coreProviders, CataloguesService],
})
export class EventModule {}
