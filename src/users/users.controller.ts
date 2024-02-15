import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SigninUserDto } from './dto/signin-user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  async create(@Body() createUserDto: CreateUserDto) {
    const user = await this.usersService.createUser(createUserDto);

    console.log(`User created`);

    return user;
  }
  @Post('signin')
  // @UseGuards(AuthGuard())
  async signIn(@Body() signInDto: SigninUserDto) {
    const user = await this.usersService.signIn(
      signInDto.username,
      signInDto.password,
    );
    if (!user) {
      throw new NotFoundException('Invalid credentials');
    }
    return { user, message: 'Signed in successfully' };
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
