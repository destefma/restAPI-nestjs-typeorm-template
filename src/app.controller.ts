import { Body, Controller, Get, Logger, Post, Query, Request, UseGuards } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { AuthService } from './typeORM/auth/auth.service';
import { JwtAuthGuard } from './typeORM/auth/jwt-auth.guard';
import { LocalAuthGuard } from './typeORM/auth/local-auth.guard';
import { User } from './typeORM/user/entitys/user.entity';
import { UsersService } from './typeORM/user/users.service';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService) { }

    @Post('auth/register')
    async register(@Request() req) {

      try {
        const {email, username, password} = req.body;
        return this.authService.register(email, username, password);

      } catch (error) {
        throw error;
      }      
    }

  @UseGuards(LocalAuthGuard)
  @Get('auth/login/user')
  async loginUser(@Query() query: { username: string, password: string }) {

    try {
      let user = new User();
      user.username = query.username
      user.password = query.password
      return this.authService.login(user);

    } catch (error) {
      throw error;
    }      
  }

  @Post('auth/verify')
  async verify(@Request() req) {
    const { userid, jwttoken } = req.body;
    return this.authService.verifyToken(userid, jwttoken);
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }


}