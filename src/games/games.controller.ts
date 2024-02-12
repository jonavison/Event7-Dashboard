import { Controller, Get, Param, Delete } from '@nestjs/common';
import { GamesService } from './games.service';

@Controller('games')
export class GamesController {
  constructor(private gamesService: GamesService) {}

  @Get()
  async findAll() {
    return this.gamesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.gamesService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.gamesService.remove(+id);
  }
}
