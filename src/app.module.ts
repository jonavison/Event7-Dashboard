import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { EventsModule } from './events/events.module';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    DatabaseModule,
    EventsModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
