import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
export class AbstractEntity<T> {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt: string;

  @UpdateDateColumn({
    type: 'timestamp',
  })
  updatedAt: string;

  constructor(entity: Partial<T>) {
    // this.id = uuidv4();
    Object.assign(this, entity);
  }
}
