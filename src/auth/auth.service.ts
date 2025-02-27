import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async registerAdmin(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser(username, hashedPassword, 'admin');
  }

  async createUserByAdmin(username: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.userService.createUser(username, hashedPassword, 'user');
  }
}
