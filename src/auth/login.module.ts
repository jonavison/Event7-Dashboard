// import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
// import { LoginMiddleware } from './login.midleware';
// import { TypesController } from 'src/types/types.controller';
// import { TypesService } from 'src/types/types.service';
// @Module({
//   controllers: [TypesController],
//   providers: [TypesService],
// })
// export class TypesModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(LoginMiddleware).forRoutes('*');
//   }
// }
