import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
// import { LoginMiddleware } from './auth/login.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug', 'verbose'],
  });
  const logger = new Logger();
  app.useLogger(logger);
  // app.use(LoginMiddleware);
  await app.listen(3000);
}
bootstrap();
