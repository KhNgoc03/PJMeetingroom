import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';

@Entity('rooms')
export class Room {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ default: true })
  available: boolean;

  // Thêm OneToMany để kết nối với Meeting
  @OneToMany(() => Meeting, (meeting) => meeting.room, { cascade: true })
  meetings: Meeting[];
}
