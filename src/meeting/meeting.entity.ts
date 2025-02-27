import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Room } from '../room/room.entity';
import { User } from '../user/user.entity';

@Entity('meetings')
export class Meeting {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ type: 'timestamp' })
  startTime: Date;

  @Column({ type: 'timestamp', nullable: false, default: () => 'CURRENT_TIMESTAMP' })
endTime: Date;


  @ManyToOne(() => Room, (room) => room.meetings, { onDelete: 'CASCADE' })
  room: Room;

  @ManyToOne(() => User, (user) => user.meetings, { onDelete: 'CASCADE' })
  user: User;
}