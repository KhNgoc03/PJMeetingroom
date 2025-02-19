import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from './room/room.entity';
import { MeetingModule } from './meeting/meeting.module';
import { Meeting } from './meeting/meeting.entity';
import { UserModule } from './user/user.module';
import { User } from './user/user.entity';

@Module({
  imports: [
    RoomModule,
    MeetingModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'bookroom',
      entities: [Room, Meeting, User], // Thêm cả User 
      synchronize: true, // Tự động đồng bộ bảng (chỉ dùng trong môi trường phát triển)
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
