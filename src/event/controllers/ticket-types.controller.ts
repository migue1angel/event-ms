import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTicketTypeDto } from '../dto/ticket_type/create-ticket-type.dto';
import { UpdateTicketTypeDto } from '../dto/ticket_type/update-ticket-type.dto';
import { RegistrationsService, TicketTypesService } from '../services';
import { ValidateTicketTypeDto } from '../dto/ticket_type/validate-ticket-type.dto';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('ticket-types')
export class TicketTypesController {
  constructor(private readonly ticketTypesService: TicketTypesService) {}

  @Post()
  create(@Body() createTicketTypeDto: CreateTicketTypeDto) {
    return 'This action adds ticket type created';
  }

  @MessagePattern('validateTicketTypes')
  async validate(@Payload() validateTicketTypeDto: ValidateTicketTypeDto[]) {
    const ticketTypes = await this.ticketTypesService.validateTicketTypes(
      validateTicketTypeDto,
    );
    return ticketTypes;
  }
 
  @Get()
  findAll() {
    return 'This action returns ticket types Found';
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns a ${id} ticket type`;
  }

  @Patch()
  async update(
    @Param('id') id: string,
    @Body() updateTicketTypeDto: UpdateTicketTypeDto,
  ) {
    await this.ticketTypesService.update(id, updateTicketTypeDto);

    return `This action update a ${id} ticket type`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action remove a ${id} ticket type`;
  }
}
