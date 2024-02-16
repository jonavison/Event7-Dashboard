import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { EntityManager, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { generateResponse } from 'src/lib/response';
import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common/exceptions';
@Injectable()
export class UsersService {
  //verify password
  async verifyPassword(password: string, password1: string) {
    try {
      const passwordMatches = await bcrypt.compare(password, password1);

      if (passwordMatches) {
        return true;
      }
      return false;
    } catch (error) {
      throw new ForbiddenException('Not valid Password', error.message);
    }
  }

  //encrypt password
  async hashPassword(password: string) {
    const saltRounds = 10;

    const hashedPassword: string = await new Promise((resolve, reject) => {
      bcrypt.hash(password, saltRounds, function (err, hash) {
        if (err) reject(err);
        resolve(hash);
      });
    });

    return hashedPassword;
  }

  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly entityManager: EntityManager,
  ) {}
  async signIn(username: string, password: string): Promise<any> {
    if (!username || !password) {
      throw new BadRequestException('Missing mandatory parameters');
    }

    const user = await this.findOneByUsername(username);
    const passwordMatches =
      user && (await bcrypt.compare(password, user.password));

    if (!passwordMatches) {
      throw new ForbiddenException('Invalid credentials');
    }

    return { success: true };
  }

  // If user and password match, throw user data with success message

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

  async findOne(id: string) {
    return this.usersRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string) {
    await this.usersRepository.delete(id);
  }
}
