import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
// import { CreateUserDto } from './dto/create-user.dto';
// import axios from 'axios';
// import { HttpCode, HttpStatusz } from '@nestjs/common';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
