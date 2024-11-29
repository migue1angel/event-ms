import { Injectable } from '@nestjs/common';
import { CataloguesService } from 'src/event/services';
import { seedData } from './data';

@Injectable()
export class DatabaseSeeder {
  constructor(private readonly cataloguesService: CataloguesService) {}

  async run() {
    const categories = await this.cataloguesService.insertMany(
      seedData.eventCategories,
    );
    const states = await this.cataloguesService.insertMany(
      seedData.eventStates,
    );
    return { categories, states };
  }
}
