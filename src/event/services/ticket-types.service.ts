import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { TicketTypeEntity } from '../entities/ticket-type.entity';
import { CreateTicketTypeDto } from '../dto/ticket_type/create-ticket-type.dto';
import { UpdateTicketTypeDto } from '../dto/ticket_type/update-ticket-type.dto';
import { CoreRepositoryEnum } from '../enums/repository.enum';

@Injectable()
export class TicketTypesService {
    constructor(
        @Inject(CoreRepositoryEnum.TICKET_TYPE_REPOSITORY)
        private readonly repository: Repository<TicketTypeEntity>,
      ) {}
    
      async create(payload: CreateTicketTypeDto) {
        const ticketType = this.repository.create(payload);
        // await this.repository.save(ticketType);
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
