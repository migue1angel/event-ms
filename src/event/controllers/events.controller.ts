import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateEventDto, UpdateEventDto } from '../dto';
import { MessagePattern } from '@nestjs/microservices';
import { CloudinaryImageConfig } from 'src/configuration/cloudinary-image-config';
import { FilesValidationPipe } from '../pipes/file.pipe';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern('findAllEvents')
  async findAll() {
    const events = await this.eventsService.findAll();
    return events;
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    const event = this.eventsService.findOne(id);
    return event;
  }

  @Post('')
  @UseInterceptors(
    FilesInterceptor('images', 3, {
      limits: {
        fileSize: CloudinaryImageConfig.maxFileSize,
      },
      fileFilter: (req, file, callback) => {
        if (!CloudinaryImageConfig.allowedMimeTypes.includes(file.mimetype)) {
          return callback(
            new BadRequestException('File type not allowed'),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @UploadedFiles(FilesValidationPipe)
    files: Express.Multer.File[],
    @Body() createEventDto: CreateEventDto,
  ) {
    const event = await this.eventsService.create(files, createEventDto);
    return event;
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return await this.eventsService.update(id, updateEventDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.eventsService.delete(id);
  }
}
