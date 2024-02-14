import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { v4 as uuidv4 } from 'uuid';
export class AbstractEntity<T> {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  constructor(entity: Partial<T>) {
    // this.id = uuidv4();
    Object.assign(this, entity);
  }
}
