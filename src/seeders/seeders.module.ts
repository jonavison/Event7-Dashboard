import { Module } from '@nestjs/common';

import { UserSeeder } from './user.seeder';
import { SeedService } from './seed.service';

@Module({
  providers: [SeedService, UserSeeder],
})
export class SeedersModule {}
