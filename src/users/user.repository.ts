import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import bcrypt from 'bcrypt';
import { Logger } from '@nestjs/common';

export class UserRepository extends Repository<User> {
  async createUser(usersData: Partial<User>[]): Promise<void> {
    try {
      await this.save(usersData);
      Logger.log('Data seeded successfully');
    } catch (error) {
      Logger.error(`Error seeding  ${error.message}`, error.stack);
    }
  }

  async setPassword(user: User, password: string): Promise<void> {
    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
  }

  async checkPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.password);
  }
}
