import { Entity } from 'typeorm';

import { AbstractEntity } from '../../database/abstract.entity';

@Entity()
export class EventCategory extends AbstractEntity<EventCategory> {
  name: string;
}
