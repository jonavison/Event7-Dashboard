import { Entity, Column } from 'typeorm';
import { IsString, Length } from 'class-validator';

import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class User extends AbstractEntity<User> {
  @IsString()
  @Length(3, 32)
  @Column({ nullable: false })
  username: string;

  @IsString()
  @Length(3, 32)
  @Column({ nullable: false })
  password: string;
}
