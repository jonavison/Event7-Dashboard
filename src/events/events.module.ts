import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { Game } from 'src/games/entities/game.entity';
@Module({
  imports: [TypeOrmModule.forFeature([Event]), Game],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
