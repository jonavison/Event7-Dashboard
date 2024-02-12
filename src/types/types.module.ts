import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Type } from './entities/type.entity';
import { Game } from 'src/games/entities/game.entity';
import { TypesService } from './types.service';
import { TypesController } from './types.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Type, Game])],
  controllers: [TypesController],
  providers: [TypesService],
})
export class TypesModule {}
