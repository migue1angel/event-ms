import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { In, MoreThan, Repository } from 'typeorm';
import { TicketTypeEntity } from '../entities/ticket-type.entity';
import { CreateTicketTypeDto } from '../dto/ticket_type/create-ticket-type.dto';
import { UpdateTicketTypeDto } from '../dto/ticket_type/update-ticket-type.dto';
import { CoreRepositoryEnum } from '../enums/repository.enum';
import { ValidateTicketTypeDto } from '../dto/ticket_type/validate-ticket-type.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class TicketTypesService {
  constructor(
    @Inject(CoreRepositoryEnum.TICKET_TYPE_REPOSITORY)
    private readonly repository: Repository<TicketTypeEntity>,
  ) {}

  create(payload: CreateTicketTypeDto) {
    const ticketType = this.repository.create(payload);
    // await this.repository.save(ticketType);
    return ticketType;
  }

  async validateTicketTypes(validateTicketTypeDto: ValidateTicketTypeDto) {
    const ticketType = await this.repository.findOne({
      where: {
        id: validateTicketTypeDto.id,
      },
      relations: {
        event: true,
      }
    });

    if (!ticketType) {
      throw new RpcException('Ticket types not found');
    }
    if (ticketType.disponibility < validateTicketTypeDto.disponibility) {
      throw new RpcException('There are not enough tickets available');
    }
    return ticketType;
  }

  async findAll() {
    const ticketType = await this.repository.find();
    return ticketType;
  }

  async findOne(id: string) {
    const ticketType = await this.repository.findOne({
      where: { id },
    });
    return ticketType;
  }

  async update(id: string, payload: UpdateTicketTypeDto) {
    const ticketType = await this.repository.preload({ id, ...payload });

    if (!ticketType) throw new NotFoundException('Not found');
    try {
      this.repository.save(ticketType);

      return ticketType;
    } catch (error) {
      console.error(error);

      return ticketType;
    }
  }

  async delete(id: string) {
    const ticketType = await this.repository.softDelete(id);
    return ticketType;
  }
}
