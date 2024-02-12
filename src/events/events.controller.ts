import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { Event } from './entities/event.entity';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';

@Controller('event')
export class EventsController {
  constructor(private eventsService: EventsService) {}
  @Get()
  obterTodos(): Promise<Event[]> {
    return this.eventsService.getAll();
  }
  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.eventsService.findOne(id);
  // }

  @Post('id')
  async create(@Body() createEventDto: CreateEventDto) {
    return this.eventsService.create(createEventDto);
  }

  @Delete('id')
  apagar(@Param() params) {
    this.eventsService.delete(params.id);
  }
}
