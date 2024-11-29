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

@Injectable()
export class EventsService {
  constructor(
    @Inject(CoreRepositoryEnum.EVENT_REPOSITORY)
    private readonly repository: Repository<EventEntity>,
    private readonly fileService: FilesService,
    @Inject(DatabaseProviderEnum.POSTGRES)
    private readonly dataSource: DataSource,
    @Inject(NATS_SERVICE)
    private readonly client: ClientProxy,
  ) {}

  async create(createEventDto: CreateEventDto) {
    // const user = await this.client.send('finduser', id);
    // if (!user) {
    //   throw new RpcException({
    //     messsage: 'User not found',
    //     status: HttpStatus.BAD_REQUEST,
    //   });
    // }
    try {
      const event = this.repository.create(createEventDto);
      await this.repository.save(event);

      return event;
    } catch (error) {
      console.log(error.message);
      throw new BadRequestException('Error creating the event');
    }
  }

  async findAll() {
    const events = await this.repository.find();
    return events;
  }

  async findOne(id: string) {
    const event = await this.repository.findOne({
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
    const event = await this.repository.preload({ id, ...payload });
    if (!event) throw new NotFoundException('Event not found');
    try {
      await this.repository.save(event);
      return event;
    } catch (error) {
      console.log(error);

      return 'Error updating the event';
    }
  }

  async delete(id: string) {
    const event = await this.repository.softDelete(id);
    return event;
  }
}
