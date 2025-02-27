import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body('username') username: string, @Body('password') password: string) {
    const user = await this.authService.validateUser(username, password);
    return this.authService.login(user);
  }

  @Post('register-admin')
  async registerAdmin(@Body('username') username: string, @Body('password') password: string) {
    return this.authService.registerAdmin(username, password);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create-user')
  async createUserByAdmin(@Request() req, @Body('username') username: string, @Body('password') password: string) {
    if (req.user.role !== 'admin') {
      return { message: 'Only admin can create users' };
    }
    return this.authService.createUserByAdmin(username, password);
  }
}
