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
import { FileEntity } from '../entities/file.entity';
import { stat } from 'fs';

@Injectable()
export class EventsService {
  constructor(
    @Inject(DatabaseProviderEnum.POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
    @Inject(CoreRepositoryEnum.EVENT_REPOSITORY)
    private readonly eventRepository: Repository<EventEntity>,
    @Inject(CoreRepositoryEnum.FILE_REPOSITORY)
    private readonly fileRepository: Repository<FileEntity>,
    private readonly addressService: AddressesService,
    private readonly ticketTypeService: TicketTypesService,
    private readonly sponsorsService: SponsorsService,
    private readonly fileService: FilesService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    // this.validateUser(createEventDto.organizer);

    try {
      const result = await this.dataSource.transaction(async (manager) => {
        const event = this.eventRepository.create(createEventDto);
        await manager.save(event);
        
        const images = await this.fileService.create( createEventDto.images, event.id);
        await manager.save(images); 

        return {
          event,
          images,
        };
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new RpcException({status: HttpStatus.BAD_REQUEST, message: 'Error creating the event'});
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
