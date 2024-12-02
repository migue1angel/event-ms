import {
  BadRequestException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateEventDto, UpdateEventDto } from '../dto';
import { DataSource, Repository } from 'typeorm';
import { EventEntity } from '../entities/event.entity';
import { FilesService } from './files.service';
import {
  CoreRepositoryEnum,
  DatabaseProviderEnum,
} from '../enums/repository.enum';
import { NATS_SERVICE } from 'src/configuration/services';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { AddressesService } from './addresses.service';
import { TicketTypesService } from './ticket-types.service';
import { SponsorsService } from './sponsors.service';
import { AddressEntity } from '../entities/address.entity';
import { TicketTypeEntity } from '../entities/ticket-type.entity';
import { SponsorEntity } from '../entities/sponsor.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class EventsService {
  constructor(
    @Inject(DatabaseProviderEnum.POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    @Inject(CoreRepositoryEnum.EVENT_REPOSITORY)
    private readonly eventRepository: Repository<EventEntity>,
    private readonly addressService: AddressesService,
    private readonly ticketTypeService: TicketTypesService,
    private readonly sponsorsService: SponsorsService,
    private readonly fileService: FilesService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    // this.validateUser(createEventDto.organizer);

    try {
      const event = await this.dataSource.transaction(async (manager) => {
        const address = this.addressService.create({
          ...createEventDto.address,
        });
        await manager.save(address);

        const createdEvent = this.eventRepository.create({
          ...createEventDto,
          address: address,
        });
        await manager.save(createdEvent);

        const ticketTypes = createEventDto.ticketTypes.map((ticketType) => {
          return this.ticketTypeService.create({
            ...ticketType,
            event: createdEvent,
          });
        });
        await manager.save(ticketTypes);

        const sponsors = createEventDto.sponsors.map((sponsor) => {
          return this.sponsorsService.create({
            ...sponsor,
            event: createdEvent,
          });
        });
        await manager.save(sponsors);

        return createdEvent;
      });

      return event;
    } catch (error) {
      console.error(error.message);
      throw new BadRequestException('Error creating the event');
    }
  }

  async findAll() {
    const events = await this.eventRepository.find();
    return events;
  }

  async findOne(id: string) {
    const event = await this.eventRepository.findOne({
      where: { id },
      relations: {
        category: true,
        state: true,
        address: true,
        ticketTypes: true,
        sponsors: true,
      },
    });

    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async update(id: string, payload: UpdateEventDto) {
    const event = await this.eventRepository.preload({ id, ...payload });
    if (!event) throw new NotFoundException('Event not found');
    try {
      await this.eventRepository.save(event);
      return event;
    } catch (error) {
      console.log(error);

      return 'Error updating the event';
    }
  }

  async delete(id: string) {
    const event = await this.eventRepository.softDelete(id);
    return event;
  }

  async validateUser(userId: string) {
    const user = await firstValueFrom(this.client.send('findUser', userId));
    if (!user) {
      throw new RpcException({
        message: 'User not valid',
        status: HttpStatus.BAD_REQUEST,
      });
    }
  }
}
