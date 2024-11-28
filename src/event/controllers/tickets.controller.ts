import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTicketDto } from '../dto/ticket/create-ticket.dto';
import { UpdateTicketDto } from '../dto/ticket/update-ticket.dto';
import { TicketsService } from '../services';

@Controller('tickets')
export class TicketsController {
    constructor(private readonly ticketService:TicketsService){}

    @Post()
    create(@Body() createTicketDto:CreateTicketDto){
        return 'This action adds ticket  created';
    }

    @Get()
    findAll(){
        return 'This action returns ticket found';
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return `This action returns a ${id} ticket `;
    }

    @Patch()
    async update(@Param('id') id:string, @Body() updateTicketDto:UpdateTicketDto){
        await this.ticketService.update(id, updateTicketDto)

        return `This action update a ${id} ticket `
    }

    @Delete(':id')
    delete(@Param('id')id:string){
        return `This action remove a ${id} ticket `
    }
}
