// import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
// import { Request, Response, NextFunction } from 'express';

// @Injectable()
// export class LoginMiddleware implements NestMiddleware {
//   private readonly logger = new Logger('HTTP');

//   use(req: Request, res: Response, next: NextFunction) {
//     const { method, originalUrl } = req;
//     const startTime = Date.now();

//     res.on('finish', () => {
//       const elapsedTime = Date.now() - startTime;
//       const statusCode = res.statusCode;
//       this.logger.log(
//         `${method} ${originalUrl} ${statusCode} - ${elapsedTime}ms`,
//       );
//     });

//     next();
//   }
// }
