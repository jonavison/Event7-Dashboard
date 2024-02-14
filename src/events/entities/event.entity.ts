// event/event.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { IsString, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { AbstractEntity } from '../../database/abstract.entity';

export enum EventType {
  CROSSPROMO = 'crosspromo',
  LIVEOPS = 'liveops',
  APP = 'app',
  ADS = 'ads',
}

@Entity()
export class Event extends AbstractEntity<Event> {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsString()
  name: string;

  @Column()
  @IsString()
  description: string;

  @Column()
  @IsNumber()
  priority: number;

  @Column()
  @IsEnum(EventType)
  @ApiProperty({ enum: EventType })
  type: EventType;
}
