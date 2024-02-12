import { IsEnum } from 'class-validator';
import { AbstractEntity } from '../../database/abstract.entity';
import { GameType } from '../entities/game.entity';
import { Game } from '../entities/game.entity';

export class CreateGameDto extends AbstractEntity<Game> {
  @IsEnum(GameType)
  name: GameType;
}
