import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TicketEntity } from '../entities/ticket.entity';
import { CreateTicketDto } from '../dto/ticket/create-ticket.dto';
import { UpdateTicketDto } from '../dto/ticket/update-ticket.dto';
import { CoreRepositoryEnum } from '../enums/repository.enum';

@Injectable()
export class TicketsService {
    constructor(
        @Inject(CoreRepositoryEnum.TICKET_REPOSITORY)
        private readonly repository: Repository<TicketEntity>,
      ) {}
    
      async create(payload: CreateTicketDto) {
        const ticket = this.repository.create(payload);
        await this.repository.save(ticket);
        return ticket;
      }
    
      async findAll() {
        const ticket = await this.repository.find();
        return ticket;
      }
    
      async findOne(id: string) {
        const ticket = await this.repository.findOne({
          where: { id },
        });
        return ticket;
      }

      async update(id: string, payload: UpdateTicketDto) {
        const ticket = await this.repository.preload({ id, ...payload });
    
        if (!ticket) throw new NotFoundException('Not found');
        try {
          this.repository.save(ticket);
    
          return ticket;
        } catch (error) {
          console.error(error);
    
          return ticket;
        }
      }
    
      async delete(id: string) {
        const ticket = await this.repository.softDelete(id);
        return ticket;
      }
}
