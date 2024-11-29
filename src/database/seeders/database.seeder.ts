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
    const status = await this.cataloguesService.insertMany(
      seedData.eventStatus,
    );
    console.table(categories);
    console.table(status);
    return { categories, status };
  }
}
