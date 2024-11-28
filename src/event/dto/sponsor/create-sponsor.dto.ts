import { IsString, IsEmail, IsNotEmpty } from 'class-validator';
import { CreateEventDto } from '../event/create-event.dto';
import { EventEntity } from '../../entities/event.entity';

export class CreateSponsorDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  event: EventEntity;
}
