import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { generateResponse } from 'src/lib/response.utill';
@Injectable()
export class UsersService {
  // //verify password
  // async verifyPassword(password: string, password1: string) {
  //   try {
  //     const passwordMatches = await bcrypt.compare(password, password1);

  //     if (passwordMatches) {
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     throw new ForbiddenException('Not valid Password', error.message);
  //   }
  // }

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.findOneByUsername(username);

    if (!user) {
      return generateResponse(false, 400, 'Missing mandatory parameters');
    }

    const passwordMatches = await bcrypt.compare(password, user.password);

    if (!passwordMatches) {
      return generateResponse(false, 401, 'Invalid credentials');
    }
    // If user and password match, return user data with success message
    return generateResponse(true, 200, 'Success', 'you shall not pass!');
  }
  // TO ADD user.adsEnabled
  // if (user) {
  //   return generateResponse(true, 200, 'Success', { ads: 'sure, why not!' });
  // } else {
  //   return generateResponse(true, 200, 'Success', {
  //     ads: 'you shall not pass!',
  //   });
  // }

  async findOneByUsername(username: string): Promise<User | null> {
    return this.usersRepository.findOne({
      where: { username },
    });
  }
  async createUser(createUserDto: CreateUserDto) {
    const user = new User({
      ...createUserDto,
    });

    try {
      await this.entityManager.save(user);

      return user;
    } catch (error) {
      console.error(`Error creating user ${user.username}:`, error);

      throw error;
    }
  }
  async findAll() {
    return this.usersRepository.find();
  }

  async findOne(id: number) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async remove(id: number) {
    await this.usersRepository.delete(id);
  }
}
