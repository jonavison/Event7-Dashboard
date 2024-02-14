// event/create-event.dto.ts
import { EventType } from '../entities/event.entity';

export class CreateEventDto {
  name: string;
  description: string;
  priority: number;
  type: EventType;
}
