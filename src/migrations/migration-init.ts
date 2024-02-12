import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1707720267537 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`event\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(100) NOT NULL, \`type\` enum ('crosspromo', 'liveops', 'app', 'ads') NOT NULL, \`priority\` int NOT NULL DEFAULT '0', \`description\` varchar(200) NOT NULL, \`gameId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`game\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` enum ('talking_tom', 'mythic_legends', 'talking_tom_2') NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`type\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`name\` varchar(80) NOT NULL, \`gameId\` int NULL, UNIQUE INDEX \`REL_6715856102fe65e93712accfcc\` (\`gameId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`createdAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updatedAt\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`username\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` ADD CONSTRAINT \`FK_7797f9c3f1bf2d2e724bd111380\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`type\` ADD CONSTRAINT \`FK_6715856102fe65e93712accfcca\` FOREIGN KEY (\`gameId\`) REFERENCES \`game\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(`
    
    INSERT INTO event (name, priority, description)
VALUES
    ('Event 1', 1, 'Description of Event 1'),
    ('Event 2', 2, 'Description of Event 2'),
    ('Event 3', 3, 'Description of Event 3'),
    ('Event 4', 4, 'Description of Event 4'),
    ('Event 5', 5, 'Description of Event 5'),
    ('Event 6', 6, 'Description of Event 6'),
    ('Event 7', 7, 'Description of Event 7'),
    ('Event 8', 8, 'Description of Event 8'),
    ('Event 9', 9, 'Description of Event 9'),
    ('Event 10', 10, 'Description of Event 10');
        `);
    await queryRunner.query(`

        INSERT INTO event (name, priority, description)
    VALUES
        ('Event 1', 1, 'Description of Event 1'),
        ('Event 2', 2, 'Description of Event 2'),
        ('Event 3', 3, 'Description of Event 3'),
        ('Event 4', 4, 'Description of Event 4'),
        ('Event 5', 5, 'Description of Event 5'),
        ('Event 6', 6, 'Description of Event 6'),
        ('Event 7', 7, 'Description of Event 7'),
        ('Event 8', 8, 'Description of Event 8'),
        ('Event 9', 9, 'Description of Event 9'),
        ('Event 10', 10, 'Description of Event 10'),
        ('Event 11', 1, 'Description of Event 1'),
        ('Event 21', 2, 'Description of Event 2'),
        ('Event 31', 3, 'Description of Event 3'),
        ('Event 41', 4, 'Description of Event 4'),
        ('Event 51', 5, 'Description of Event 5'),
        ('Event 61', 6, 'Description of Event 6'),
        ('Event 71', 7, 'Description of Event 7'),
        ('Event 81', 8, 'Description of Event 8'),
        ('Event 91', 9, 'Description of Event 9'),
        ('Event 101', 10, 'Description of Event 10');
        
            `);
    await queryRunner.query(`
            INSERT INTO game (name)
            VALUES
                ('Talking_Tom'),
                ('Mythic_Legends'),
                ('Talking_Tom_2');

                    `);
    await queryRunner.query(` 
    INSERT INTO user (username, password)

    VALUES
    
        ('fun7user', 'fun7password');
        `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`type\` DROP FOREIGN KEY \`FK_6715856102fe65e93712accfcca\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event\` DROP FOREIGN KEY \`FK_7797f9c3f1bf2d2e724bd111380\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(
      `DROP INDEX \`REL_6715856102fe65e93712accfcc\` ON \`type\``,
    );
    await queryRunner.query(`DROP TABLE \`type\``);
    await queryRunner.query(`DROP TABLE \`game\``);
    await queryRunner.query(`DROP TABLE \`event\``);
  }
}
