import { Column, Entity, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Event } from 'src/events/entities/event.entity';

export enum GameType {
  TalkingTOM = 'talking_tom',
  MythicLegend = 'mythic_legends',
  TalkingTom2 = 'talking_tom_2',
}
@Entity()
export class Game extends AbstractEntity<Game> {
  @Column({ type: 'enum', enum: GameType, nullable: false })
  name: GameType;

  // @OneToMany(() => Event, (event) => event.game, { cascade: true })
  // event: Event[];
}
