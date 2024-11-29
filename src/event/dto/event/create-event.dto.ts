import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { CreateSponsorDto } from '../sponsor/create-sponsor.dto';
import { CatalogueEntity } from '../../entities/catalogue.entity';
import { CreateAddressDto } from '../address/create-address.dto';
import { CreateTicketTypeDto } from '../ticket_type/create-ticket-type.dto';
import { Type } from 'class-transformer';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  // @IsDate()
  startDate: Date;

  @IsNotEmpty()
  // @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsUUID()
  state: CatalogueEntity;
  
  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;
  
  @IsNotEmpty()
  category: CatalogueEntity;

  @IsNotEmpty()
  organizer: string;

  @IsNotEmpty()
  @Type(() => CreateAddressDto)
  address: CreateAddressDto;

  @IsBoolean()
  hasSponsors: boolean;

  @IsOptional()
  sponsors?: CreateSponsorDto[];

  @IsNotEmpty()
  @Type(() => CreateTicketTypeDto)
  ticket_types?: CreateTicketTypeDto[];
}
