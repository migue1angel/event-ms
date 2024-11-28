import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { EventEntity } from '../../entities/event.entity';

export class CreateFeedbackDto {
  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsString()
  @IsNotEmpty()
  comment: string;

  @IsNotEmpty()
  user: string;

  @IsNotEmpty()
  event: EventEntity;
}
