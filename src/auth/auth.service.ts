import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { UnauthorizedException } from '@nestjs/common';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  //validate user
  async signIn(username: string, password: string): Promise<any> {
    const user = await this.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }
  async validateUser(username: string, password: string): Promise<boolean> {
    const validUsernames = ['fun7user', 'user2'];
    const validPasswords = {
      fun7user: 'fun7pass',
      user2: 'password2',
    };

    if (
      validUsernames.includes(username) &&
      validPasswords[username] === password
    ) {
      return true; // User is valid
    }

    return false; // User is not valid
  }

  async checkAdsType(): Promise<'enabled' | 'disabled'> {
    // Replace this with your actual logic to check if ads type is enabled or disabled
    const adsType = 'enabled'; // or 'disabled'
    return adsType;
  }
}
