import { DataSource } from 'typeorm';
import { CatalogueEntity } from '../entities/catalogue.entity';
import { AddressEntity } from '../entities/address.entity';
import { EventEntity } from '../entities/event.entity';
import { FileEntity } from '../entities/file.entity';
import { SponsorEntity } from '../entities/sponsor.entity';
import { TicketTypeEntity } from '../entities/ticket-type.entity';
import { RegistrationEntity } from '../entities/registration.entity';
import { TicketEntity } from '../entities/ticket.entity';
import { CoreRepositoryEnum, DatabaseProviderEnum } from '../enums/repository.enum';

export const coreProviders = [
  {
    provide: CoreRepositoryEnum.CATALOGUE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CatalogueEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: CoreRepositoryEnum.ADDRESS_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(AddressEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: CoreRepositoryEnum.EVENT_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(EventEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: CoreRepositoryEnum.FILE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FileEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: CoreRepositoryEnum.SPONSOR_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(SponsorEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: CoreRepositoryEnum.TICKET_TYPE_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TicketTypeEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: CoreRepositoryEnum.REGISTRATION_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(RegistrationEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
  {
    provide: CoreRepositoryEnum.TICKET_REPOSITORY,
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(TicketEntity),
    inject: [DatabaseProviderEnum.POSTGRES],
  },
];
