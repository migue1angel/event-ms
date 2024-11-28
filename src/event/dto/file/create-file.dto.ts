import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class CreateFileDto {

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsString()
  publicId: string;

  @IsNotEmpty()
  @IsString()
  resourceType: string;

  @IsNotEmpty()
  @IsString()
  format: string;
  
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;
  
  @IsNotEmpty()
  @IsString()
  entityId: string;

}
