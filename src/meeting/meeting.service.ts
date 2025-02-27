import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Meeting } from './meeting.entity';

@Injectable()
export class MeetingService {
  constructor(
    @InjectRepository(Meeting)
    private readonly meetingRepository: Repository<Meeting>,
  ) {}

  async findAll(): Promise<Meeting[]> {
    return await this.meetingRepository.find();
  }

  async findOne(id: number): Promise<Meeting | null> {
    return await this.meetingRepository.findOne({ where: { id } });
  }

  async createMeeting(meetingData: Partial<Meeting>): Promise<Meeting> {
    const newMeeting = this.meetingRepository.create(meetingData);
    return await this.meetingRepository.save(newMeeting);
}


  async update(id: number, updateData: Partial<Meeting>): Promise<Meeting | null> {
    const meeting = await this.findOne(id);
    if (!meeting) return null;
    Object.assign(meeting, updateData);
    return await this.meetingRepository.save(meeting);
  }

  async delete(id: number): Promise<boolean> {
    const result = await this.meetingRepository.delete(id);
    return result.affected > 0;
  }
}