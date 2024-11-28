import {
  Controller,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { RegistrationEntity } from '../entities/registration.entity';
import { CreateRegistrationDto } from '../dto/registration/create-registration.dto';
import { UpdateRegistrationDto } from '../dto/registration/update-registration.dto';
import { CoreRepositoryEnum } from '../enums/repository.enum';

@Injectable()
export class RegistrationsService {
  constructor(
    @Inject(CoreRepositoryEnum.REGISTRATION_REPOSITORY)
    private readonly repository: Repository<RegistrationEntity>,
  ) {}

  async create(payload: CreateRegistrationDto) {
    const registration = this.repository.create(payload);
    await this.repository.save(payload);
    return registration;
  }

  async findAll() {
    const registration = await this.repository.find();
    return registration;
  }

  async findOne(id: string) {
    const registration = await this.repository.findOne({
      where: { id },
    });
    return registration;
  }

  async update(id: string, payload: UpdateRegistrationDto) {
    const registration = await this.repository.preload({ id, ...payload });

    if (!registration) throw new NotFoundException('Not found');
    try {
      await this.repository.save(registration);

      return registration;
    } catch (error) {
      console.error(error);

      return registration;
    }
  }

  async delete(id: string) {
    const registration = await this.repository.softDelete(id);
    return registration;
  }
}
