import { IsString, IsNotEmpty, IsOptional, IsNumber } from "class-validator";

export class CreateCatalogueDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    type: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsNotEmpty()
    @IsNumber()
    code: number;
}