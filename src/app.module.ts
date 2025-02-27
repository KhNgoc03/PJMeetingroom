import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/room.entity';
import { Meeting } from './meeting/meeting.entity';
import { User } from './user/user.entity';
import { RoomModule } from './room/room.module';
import { MeetingModule } from './meeting/meeting.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as any || 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: parseInt(process.env.DATABASE_PORT, 10) || 3306,
      username: process.env.DATABASE_USERNAME || 'root',
      password: process.env.DATABASE_PASSWORD || '',
      database: process.env.DATABASE_NAME || 'bookroom',
      entities: [Room, Meeting, User],
      synchronize: true,
    }),
    RoomModule,
    MeetingModule,
    UserModule,
    AuthModule
  ],
})
export class AppModule {}
