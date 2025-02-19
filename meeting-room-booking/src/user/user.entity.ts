import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Meeting } from '../meeting/meeting.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @OneToMany(() => Meeting, (meeting) => meeting.user)
  meetings: Meeting[];
}
