import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { MeetingService } from './meeting.service';
import { Meeting } from './meeting.entity';

@Controller('meetings')
export class MeetingController {
  constructor(private readonly meetingService: MeetingService) {}

  @Get()
  findAll() {
    return this.meetingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.meetingService.findOne(id);
  }

  @Post()
  create(@Body() meetingData: Partial<Meeting>) {
    return this.meetingService.create(meetingData);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateData: Partial<Meeting>) {
    return this.meetingService.update(id, updateData);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.meetingService.delete(id);
  }
}
