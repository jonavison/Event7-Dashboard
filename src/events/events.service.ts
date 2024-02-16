import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { EntityManager } from 'typeorm';
import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EventType } from './entities/event.entity';

import { BadRequestException, NotFoundException } from '@nestjs/common';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
    private readonly entityManager: EntityManager,
  ) {}
  async create(createEventDto: CreateEventDto) {
    const event = new Event(createEventDto);
    await this.entityManager.save(event);
  }

  async findAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async findAllByType(type: EventType): Promise<Event[]> {
    return this.eventsRepository.find({ where: { type } });
  }

  async findOneById(id: string) {
    return this.eventsRepository.findOne({
      where: { id },
    });
  }
  async update(id: string, updateEventDto: UpdateEventDto): Promise<Event> {
    const eventToUpdate = await this.eventsRepository.findOne({
      where: { id },
    });

    if (!eventToUpdate) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    Object.assign(eventToUpdate, updateEventDto);

    return this.eventsRepository.save(eventToUpdate);
  }

  //delete event
  async remove(id: string): Promise<void> {
    try {
      const event = await this.findOneById(id);

      if (!event) {
        throw new NotFoundException('Event not found');
      }

      await this.eventsRepository.delete(id);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
