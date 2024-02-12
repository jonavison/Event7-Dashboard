import { Column, Entity, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Type extends AbstractEntity<Type> {
  @Column()
  name: string;

  @ManyToOne(() => User, (user) => user.type)
  user: User;

  // @ManyToOne(() => Event, (event) => event.type)
  // event: Event;
}
