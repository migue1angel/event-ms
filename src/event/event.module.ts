import { Module } from '@nestjs/common';
import { coreProviders } from './providers';
import { DatabaseModule } from 'src/database/database.module';
import { EventsService } from './services/events.service';
import { CataloguesService } from './services/catalogues.service';
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
} from './services';

@Module({
  imports: [DatabaseModule],
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
    FilesService
  ],
})
export class EventModule {}
