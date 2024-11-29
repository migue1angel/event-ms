import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeders/database.seeder';
import { coreProviders } from 'src/event/providers';
import { CataloguesService } from 'src/event/services';

@Global()
@Module({
    providers:[...databaseProviders, DatabaseSeeder, ...coreProviders, CataloguesService],
    exports:[...databaseProviders, DatabaseSeeder]
})
export class DatabaseModule {}
