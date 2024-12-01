import {
  Controller,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateSponsorDto } from '../dto';
import { UpdateSponsorDto } from '../dto';
import { Repository } from 'typeorm';
import { SponsorEntity } from '../entities/sponsor.entity';
import { CoreRepositoryEnum } from '../enums/repository.enum';

@Injectable()
export class SponsorsService {
  constructor(
    @Inject(CoreRepositoryEnum.SPONSOR_REPOSITORY)
    private repository: Repository<SponsorEntity>,
  ) {}

  async create(payload: CreateSponsorDto) {
    const sponsor = this.repository.create(payload);
    // await this.repository.save(sponsor);
    return sponsor;
  }

  async findAll() {
    const sponsors = await this.repository.find();
    return sponsors;
  }

  async findOne(id: string) {
    const sponsor = await this.repository.findOne({
      where: { id: id },
    });
    return sponsor;
  }
  async update(id: string, payload: UpdateSponsorDto) {
    const sponsor = await this.repository.preload({ id: id, ...payload });
    if (!sponsor) throw new NotFoundException('Sponsor not found');
    try {
      await this.repository.save(sponsor);
      return sponsor;
    } catch (error) {
      console.log(error);

      return 'Error updating the sponsor';
    }
  }
  async delete(id: string) {
    const sponsor = await this.repository.softDelete(id);
    return sponsor;
  }
}
