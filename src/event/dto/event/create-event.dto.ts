import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString} from 'class-validator';
import { CreateSponsorDto } from '../sponsor/create-sponsor.dto';
import { CatalogueEntity } from '../../entities/catalogue.entity';
import { CreateAddressDto } from '../address/create-address.dto';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  start_date: Date;

  @IsNotEmpty()
  @IsDate()
  end_date: Date;

  @IsNotEmpty()
  status: CatalogueEntity;

  @IsNotEmpty()
  @IsBoolean()
  isPublic: boolean;

  @IsNotEmpty()
  category: CatalogueEntity;

  @IsNotEmpty()
  organizer: string;

  @IsNotEmpty()
  address: CreateAddressDto;
  
  @IsOptional()
  sponsors?: CreateSponsorDto[];
  
}
