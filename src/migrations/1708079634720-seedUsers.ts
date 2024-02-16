import { MigrationInterface, QueryRunner } from 'typeorm';
import { User } from '../users/entities/user.entity'; // Adjust the path accordingly

export class SeedUsers1708081112223 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.manager.insert(User, {
        username: 'john',
        password: 'password1',
      });
      await queryRunner.manager.insert(User, {
        username: 'jane',
        password: 'password2',
      });
      await queryRunner.manager.insert(User, {
        username: 'bob',
        password: 'password3',
      });
    } catch (error) {
      console.error('Error occurred while seeding users:', error);
      throw error; // Rethrow the error to stop the migration in case of failure
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.manager.delete(User, {});
    } catch (error) {
      console.error('Error occurred while removing seeded users:', error);
      throw error;
    }
  }
}
