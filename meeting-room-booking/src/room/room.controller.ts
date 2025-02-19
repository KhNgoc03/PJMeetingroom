import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { RoomService } from './room.service';
import { Room } from './room.entity';

@Controller('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roomService.findOne(id);
  }

  @Post()
  create(@Body() roomData: Partial<Room>) {
    return this.roomService.create(roomData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Room>) {
    return this.roomService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.roomService.delete(id);
  }
}
