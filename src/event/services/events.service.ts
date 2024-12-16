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
    private readonly fileService: FilesService,
  ) {}

  async create(createEventDto: CreateEventDto) {
    // this.validateUser(createEventDto.organizer);

    try {
      const result = await this.dataSource.transaction(async (manager) => {
        const event = this.eventRepository.create(createEventDto);
        await manager.save(event);

        const images = await this.fileService.create(
          createEventDto.images,
          event.id,
        );
        await manager.save(images);

        return {
          event,
          images,
        };
      });
      return result;
    } catch (error) {
      console.log(error.message);
      throw new RpcException({
        status: HttpStatus.BAD_REQUEST,
        message: 'Error creating the event',
      });
    }
  }

  async findAll() {
    const events = await this.eventRepository.find({
      relations: {
        category: true,
        //   address: true,
        //   sponsors: true,
        //   ticketTypes: true,
      },
    });
    const returnedEvents = await Promise.all(
      events.map(async (event) => {
        const images = await this.fileService.findByEvent(event.id);
        return {
          ...event,
          images,
        };
      }),
    );
    return returnedEvents;
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
    const organizer = await firstValueFrom(this.client.send('findUser', event.organizer));
    const images = await this.fileService.findByEvent(id);
    if (!event) throw new NotFoundException('Event not found');
    return {...event, images, organizer};
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
