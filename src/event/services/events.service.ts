import {
  BadRequestException,
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

@Injectable()
export class EventsService {
  constructor(
    @Inject(CoreRepositoryEnum.EVENT_REPOSITORY)
    private readonly repository: Repository<EventEntity>,
    private readonly fileService: FilesService,
    @Inject(DatabaseProviderEnum.POSTGRES)
    private readonly dataSource: DataSource,
  ) {}

  async create(files: Express.Multer.File[], createEventDto: CreateEventDto) {
    try {
      const result = await this.dataSource.transaction(async (manager) => {
        const event = this.repository.create(createEventDto);
        const createdEvent = await manager.save(event);
        const images = await this.fileService.create(files, createdEvent.id);

        return {
          event: createdEvent,
          images,
        };
      });
      return result;
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
    });

    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  // async create(payload: CreateEventDto) {
  //   try {
  //     const event = this.repository.create(payload);
  //     await this.repository.save(event);
  //     return event;
  //   } catch (error) {
  //     console.log(error);

  //     return 'Error creating the event';
  //   }
  // }

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
