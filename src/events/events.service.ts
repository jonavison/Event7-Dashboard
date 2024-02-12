import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { faker } from '@faker-js/faker';

import { Event } from './entities/event.entity';
import { Game } from 'src/games/entities/game.entity';
@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventsRepository: Repository<Event>,
    private readonly entityManager: EntityManager,
  ) {}

  // async findOne(id: number) {
  //   return this.eventsRepository.findOne({
  //     where: { id },
  //     relations: { gameId: id },
  //   });
  // }

  async getAll(): Promise<Event[]> {
    return this.eventsRepository.find();
  }

  async getOne(id: number): Promise<Event | null> {
    return this.eventsRepository.findOne({ where: { id } });
  }

  async create(event: Event): Promise<Event> {
    return this.eventsRepository.save(event);
  }

  async change(event: Event): Promise<Event> {
    return this.eventsRepository.save(event);
  }

  async delete(id: number): Promise<void> {
    const eventToRemove = await this.eventsRepository.findOne({
      where: { id },
    });
    await this.eventsRepository.remove(eventToRemove);
  }

  async seedEvents(number = 10, options?: Partial<Event>): Promise<void> {
    const events = [];

    for (let i = 0; i < number; i++) {
      const event = new Event(options);
      event.name = faker.commerce.productName();
      event.description = faker.commerce.productDescription();
      event.priority = faker.number.int({ min: 0, max: 10 });
      events.push(event);
    }

    await this.eventsRepository.save(events);
  }
}
