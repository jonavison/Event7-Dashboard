import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Type } from './entities/type.entity';
import { TypesService } from './types.service';
import axios from 'axios';

@Controller('types')
export class TypesController {
  constructor(private readonly typesService: TypesService) {}

  @Post('create-ads-type-event')
  async createAdsTypeEvent(
    @Body('10') ip: string,
    @Body('fun7user') username: string,
    @Body('fun7pass') password: string,
  ) {
    try {
      const country_code = await this.getUserLocation(ip);
      if (await this.checkAdsTypePermission(country_code, username, password)) {
        console.log('Permission granted to create ads type events');

        // Create ads type event here
      } else {
        console.log('Permission denied to create ads type events');
      }
    } catch (e) {
      console.error(e);
    }
  }

  private async getUserLocation(ip: string): Promise<string> {
    const response = await axios.post(`http://localhost:3000/${ip}`);
    if (response.status === 200) {
      return response.data['countryCode'];
    } else {
      throw new Error('Failed to get user location');
    }
  }
  private async checkAdsTypePermission(
    country_code: string,
    username: string,
    password: string,
  ): Promise<boolean> {
    const response = await axios.get(
      'https://us-central1-o7tools.cloudfunctions.net/fun7-ad-partner',
      {
        params: { countryCode: country_code },
        auth: { username, password },
      },
    );
    if (response.status === 200) {
      return response.data['ads'] === 'sure, why not!';
    } else if (response.status === 401) {
      return false;
    } else if (response.status === 400) {
      return false;
    } else if (response.status === 500) {
      return false;
    } else {
      throw new Error('Failed to check ads type permission');
    }
  }

  @Get()
  async findAll(): Promise<Type[]> {
    return this.typesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Type> {
    return this.typesService.findOne(id);
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<void> {
    return this.typesService.delete(id);
  }
}
