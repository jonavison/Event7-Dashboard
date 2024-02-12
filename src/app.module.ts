import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { GamesModule } from './games/games.module';
import { EventsModule } from './events/events.module';
import { UsersModule } from './users/users.module';
import { TypesModule } from './types/types.module';

@Module({
  imports: [
    DatabaseModule,
    EventsModule,
    GamesModule,
    UsersModule,
    TypesModule,
  ],
})
export class AppModule {}
