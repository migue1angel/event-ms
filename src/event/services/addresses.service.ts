import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateAddressDto, UpdateAddressDto } from '../dto';
import { AddressEntity } from '../entities/address.entity';
import { Repository } from 'typeorm';
import { CoreRepositoryEnum } from '../enums/repository.enum';

@Injectable()
export class AddressesService {
  constructor(
    @Inject(CoreRepositoryEnum.ADDRESS_REPOSITORY)
    private readonly repository: Repository<AddressEntity>,
  ) {}

  create(payload: CreateAddressDto) {
    const address = this.repository.create(payload);
    // await this.repository.save(address);
    return address;
  }
  async findAll() {
    const addresses = await this.repository.find();
    return addresses;
  }
  async findOne(id: string) {
    const address = await this.repository.findOne({
      where: { id: id },
    });
    return address;
  }
  async update(id: string, payload: UpdateAddressDto) {
    const address = await this.repository.preload({ id: id, ...payload });
    if (!address) throw new NotFoundException('Address not found');
    try {
      await this.repository.save(address);
      return address;
    } catch (error) {
      console.log(error);

      return 'Error updating the address';
    }
  }
  async delete(id: string) {
    const address = await this.repository.softDelete(id);
    return address;
  }
}
