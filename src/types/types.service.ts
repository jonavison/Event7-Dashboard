import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, EntityManager } from 'typeorm';

import { Type } from './entities/type.entity';
import { CreateTypeDto } from './dto/create-type.dto';
import { Game } from 'src/games/entities/game.entity';

@Injectable()
export class TypesService {
  constructor(
    @InjectRepository(Type)
    private readonly typesRepository: Repository<Type>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createTypeDto: CreateTypeDto) {
    const type = new Type({
      ...createTypeDto,
    });
    await this.entityManager.save(type);
  }

  async findAll() {
    return this.typesRepository.find();
  }

  async findOne(id: number) {
    return this.typesRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.typesRepository.delete(id);
  }

  async getAll(): Promise<Type[]> {
    return this.typesRepository.find();
  }

  async getOne(id: number): Promise<Type | null> {
    return this.typesRepository.findOne({ where: { id } });
  }

  async change(type: Type): Promise<Type> {
    return this.typesRepository.save(type);
  }

  async delete(id: number): Promise<void> {
    const typeToRemove = await this.typesRepository.findOne({
      where: { id },
    });
    await this.typesRepository.remove(typeToRemove);
  }
}
