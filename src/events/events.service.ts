import { Injectable } from '@nestjs/common';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

import { Event } from './entities/event.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { NotFoundException } from '@nestjs/common';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventsRepository: Repository<Event>,
  ) {}
  async create(createEventDto: CreateEventDto): Promise<Event> {
    const newEvent = this.eventsRepository.create(createEventDto);
    return this.eventsRepository.save(newEvent);
  }
  findAll() {
    return `This action returns all events`;
  }

  findOne(id: number) {
    return `This action returns a #${id} event`;
  }
  async update(id: number, updateEventDto: UpdateEventDto): Promise<Event> {
    const eventToUpdate = await this.eventsRepository.findOne({
      where: { id },
    });

    if (!eventToUpdate) {
      throw new NotFoundException(`Event with ID ${id} not found`);
    }

    Object.assign(eventToUpdate, updateEventDto);

    return this.eventsRepository.save(eventToUpdate);
  }
  remove(id: number) {
    return `This action removes a #${id} event`;
  }
}
