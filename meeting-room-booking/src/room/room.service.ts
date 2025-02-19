import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Room } from './room.entity';

@Injectable()
export class RoomService {
  constructor(@InjectRepository(Room) private roomRepo: Repository<Room>) {}

  findAll() {
    return this.roomRepo.find();
  }

  findOne(id: number) {
    return this.roomRepo.findOne({ where: { id } });
  }

  create(roomData: Partial<Room>) {
    const room = this.roomRepo.create(roomData);
    return this.roomRepo.save(room);
  }

  async update(id: number, updateData: Partial<Room>) {
    await this.roomRepo.update(id, updateData);
    return this.findOne(id);
  }

  delete(id: number) {
    return this.roomRepo.delete(id);
  }
}
