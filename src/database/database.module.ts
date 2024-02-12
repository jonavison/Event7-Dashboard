import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.getOrThrow('MYSQL_HOST'),
        port: configService.getOrThrow('MYSQL_PORT'),
        database: configService.getOrThrow('MYSQL_DATABASE'),
        username: configService.getOrThrow('MYSQL_USERNAME'),
        password: configService.getOrThrow('MYSQL_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('MYSQL_SYNCHRONIZE'),
        migrations: [__dirname + './src/migrations/**/*{.ts,.js}'],
        seeds: [__dirname + '/seeds/**/*{.ts,.js}'],
        factories: [__dirname + '/factories/**/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
