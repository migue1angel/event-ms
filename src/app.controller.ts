import { Controller } from '@nestjs/common';
import { DatabaseSeeder } from './database/seeders/database.seeder';
import { MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly databaseSeeder: DatabaseSeeder) {}

  @MessagePattern('eventSeed')
  seed() {
    return this.databaseSeeder.run();
  }
}
 