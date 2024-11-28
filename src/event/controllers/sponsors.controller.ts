import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { SponsorsService } from '../services/sponsors.service';
import { CreateSponsorDto, UpdateSponsorDto } from '../dto';

@Controller('sponsors')
export class SponsorsController {
    constructor(private readonly sponsorsService:SponsorsService){}

    @Post()
    async create(@Body() payload: CreateSponsorDto) {
      const sponsor = await this.sponsorsService.create(payload);
      return sponsor;
    }

    @Get()
    async findAll() {
    const sponsors = await this.sponsorsService.findAll();
    return sponsors;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const sponsor = await this.sponsorsService.findOne(id);
    return sponsor;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateSponsorDto) {
    const sponsor = await this.sponsorsService.update(id, payload);
    return sponsor;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const sponsor = await this.sponsorsService.delete(id);
    return sponsor
  }
}
