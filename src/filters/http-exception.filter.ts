import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const errorResponse = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      error:
        (errorResponse && errorResponse['message']) ||
        'An unexpected error occurred',
    });
    let errorMessage = '';
    if (status === 401) {
      errorMessage = 'Invalid username or password';
    } else if (status === 403) {
      errorMessage = 'Ads type is disabled for this user';
    } else if (status === 500) {
      errorMessage = 'Server is temporarily not available';
    }

    console.error('Error message:', errorMessage);
  }
}
