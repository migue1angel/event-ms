import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateCatalogueDto, UpdateCatalogueDto } from '../dto';
import { CataloguesService } from '../services/catalogues.service';
import { MessagePattern } from '@nestjs/microservices';

@Controller('catalogues')
export class CataloguesController {
  constructor(private readonly cataloguesService: CataloguesService) {}
  @Post()
  async create(@Body() payload: CreateCatalogueDto) {
    const catalogue = await this.cataloguesService.create(payload);
    return catalogue;
  }

  @MessagePattern('findAllCatalogues')
  async findAll() {
    const catalogues = await this.cataloguesService.findAll();
    return catalogues;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const catalogue = await this.cataloguesService.findOne(id);
    return catalogue;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateCatalogueDto) {
    const catalogue = await this.cataloguesService.update(id, payload);
    return catalogue;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const catalogue = await this.cataloguesService.delete(id);
    return catalogue
  }
}
