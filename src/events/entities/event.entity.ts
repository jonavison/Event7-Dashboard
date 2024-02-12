import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { Min, Max } from 'class-validator';
import { AbstractEntity } from '../../database/abstract.entity';
// import { Game } from 'src/games/entities/game.entity';
// import { GameType } from 'src/games/entities/game.entity';

export enum EventType {
  Crosspromo = 'crosspromo',
  Liveops = 'liveops',
  App = 'app',
  Ads = 'ads',
}

@Entity()
export class Event extends AbstractEntity<Event> {
  @Column({ nullable: false, length: 100 })
  name: string;

  @Column({ type: 'enum', enum: EventType, nullable: false })
  type: EventType;

  @Column({ type: 'int', nullable: false, default: 0 })
  @Min(0, { message: 'Priority must be at least 0' })
  @Max(10, { message: 'Priority cannot exceed 10' })
  priority: number;

  @Column({ type: 'varchar', length: 200, nullable: false })
  @Min(1, { message: 'Description must be at least 1 character long' })
  @Max(200, { message: 'Description cannot exceed 200 characters' })
  description: string;

  // @ManyToOne(() => Game, (game) => game.event)
  // @JoinColumn()
  // game: GameType;
}
