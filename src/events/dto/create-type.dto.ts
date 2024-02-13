import { AbstractEntity } from '../../database/abstract.entity';
import { IsString, IsEnum, IsNumber, IsNotEmpty } from 'class-validator';
import { EventType } from '../entities/event.entity';
import { GameType } from '../../games/entities/game.entity';
export class CreateTypeDto extends AbstractEntity<Event> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  priority: number;

  @IsEnum(EventType)
  @IsNotEmpty()
  type: EventType;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsEnum(GameType)
  @IsNotEmpty()
  game: GameType;
}
