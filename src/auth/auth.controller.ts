import { Controller, Get, Body, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('signin')
  async signin(@Body() user: any, @Res() res: Response) {
    try {
      // Check if mandatory parameters are present
      if (!user.username || !user.password) {
        return res.status(HttpStatus.BAD_REQUEST).json({
          error: 'Missing mandatory parameters',
        });
      }

      // Authenticate user
      const isValid = await this.authService.validateUser(
        user.username,
        user.password,
      );

      if (!isValid) {
        return res.status(HttpStatus.UNAUTHORIZED).json({
          error: 'Invalid credentials',
        });
      }

      // Check if ads type is enabled or disabled
      const adsType = await this.authService.checkAdsType();

      // If authentication is successful, return a success response
      if (adsType === 'enabled') {
        return res.status(HttpStatus.OK).json({
          message: 'Sure, why not!',
        });
      } else {
        return res.status(HttpStatus.OK).json({
          message: 'You shall not pass!',
        });
      }
    } catch (error) {
      // If any server error occurs, return a 500 response
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        error: 'Server is temporarily not available',
      });
    }
  }
}
