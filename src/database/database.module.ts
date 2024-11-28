import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeders/database.seeder';

@Global()
@Module({
    providers:[...databaseProviders, DatabaseSeeder],
    exports:[...databaseProviders, DatabaseSeeder]
})
export class DatabaseModule {}
