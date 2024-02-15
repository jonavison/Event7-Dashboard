import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UserSeeder } from './user.seeder';

@Injectable()
export class SeedService {
  constructor(private readonly userSeeder: UserSeeder) {}

  async seed() {
    const createUserDto: CreateUserDto = {
      username: 'John',
      password: 'Doe',
    };

    await this.userSeeder.seedUser(createUserDto);
  }
}
