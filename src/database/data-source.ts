import * as dotenv from 'dotenv';
dotenv.config();
import { DataSource } from 'typeorm';

export default new DataSource({
  type: 'mysql',
  host: process.env.MYSQL_HOST,
  port: Number.parseInt(process.env.MYSQL_PORT),
  username: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  synchronize: Boolean(process.env.MYSQL_SYNCHRONIZE),
  dropSchema: false,
  migrations: ['./src/migrations/**'],
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrationsTableName: 'migration_table',
});
