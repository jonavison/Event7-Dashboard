import { EventType } from '../entities/event.entity';
export class UpdateEventDto {
  name: string;
  description: string;
  priority: number;
  type: EventType;
}
