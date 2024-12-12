import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { EventsService } from '../services/events.service';
import { CreateEventDto, UpdateEventDto } from '../dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @MessagePattern('findAllEvents')
  async findAll() {
    const events = await this.eventsService.findAll();
    return events;
  }
  
  @MessagePattern('findOneEvent')
  findOne(@Payload() id: string) {
    const event = this.eventsService.findOne(id);
    return event;
  }

  @MessagePattern('createEvent')
  async create(@Payload() createEventDto: CreateEventDto) {     
    const event = await this.eventsService.create(createEventDto);
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
