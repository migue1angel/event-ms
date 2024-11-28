import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { AddressesService } from '../services/addresses.service';
import { CreateAddressDto, UpdateAddressDto } from '../dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Post()
  async create(@Body() payload: CreateAddressDto) {
    const addresse = await this.addressesService.create(payload);
    return addresse;
  }

  @Get()
  async findAll() {
    const addresses = await this.addressesService.findAll();
    return addresses;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const addresse = await this.addressesService.findOne(id);
    return addresse;
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() payload: UpdateAddressDto) {
    const addresse = await this.addressesService.update(id, payload);
    return addresse;
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const addresse = await this.addressesService.delete(id);
    return addresse;
  }
}
