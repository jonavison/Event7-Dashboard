import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { Game } from './entities/game.entity';

@Injectable()
export class GamesService {
  constructor(
    @InjectRepository(Game)
    private readonly gamesRepository: Repository<Game>,
    private readonly entityManager: EntityManager,
  ) {}

  async findAll() {
    return this.gamesRepository.find();
  }

  async findOne(id: number) {
    return this.gamesRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.gamesRepository.delete(id);
  }
}
