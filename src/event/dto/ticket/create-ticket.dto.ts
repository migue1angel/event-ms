import { IsBoolean, IsDate, IsNotEmpty, IsString } from "class-validator";
import { TicketTypeEntity } from "../../entities/ticket-type.entity";
import { EventEntity } from "../../entities/event.entity";

export class CreateTicketDto{
    @IsString()
    @IsNotEmpty()
    code: string;
    
    @IsBoolean()
    @IsNotEmpty()
    state: boolean;
    
    @IsDate()
    @IsNotEmpty()
    generatedDate: Date;
    
    @IsString()
    ticketType:TicketTypeEntity;
    
    @IsString()
    user:string;
    
    @IsString()
    event:EventEntity;


}