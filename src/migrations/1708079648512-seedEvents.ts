import { MigrationInterface, QueryRunner } from 'typeorm';
import { Event, EventType, GameName } from '../events/entities/event.entity'; // Adjust the path accordingly

export class SeedEvents1708079648512 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.manager.insert(Event, {
        name: 'Event 1',
        description: 'Description of Event 1',
        priority: 1,
        type: EventType.CROSSPROMO,
        game: GameName.TALKING_TOM,
      });

      await queryRunner.manager.insert(Event, {
        name: 'Event 2',
        description: 'Description of Event 2',
        priority: 2,
        type: EventType.LIVEOPS,
        game: GameName.TALKING_TOM,
      });

      await queryRunner.manager.insert(Event, {
        name: 'Event 3',
        description: 'Description of Event 3',
        priority: 3,
        type: EventType.APP,
        game: GameName.MYTHIIC_LEGEND,
      });

      // Insert more events as needed...
    } catch (error) {
      console.error('Error occurred while seeding events:', error);
      throw error; // Rethrow the error to stop the migration in case of failure
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.manager.delete(Event, {});
    } catch (error) {
      console.error('Error occurred while removing seeded Events:', error);
      throw error;
    }
  }
}
