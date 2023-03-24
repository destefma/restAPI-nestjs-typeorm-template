import { Body, Controller, Get, Inject, Logger, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from './entitys/user.entity';
import { UsersService } from './users.service';

//@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
    @Inject(UsersService)
    private readonly service: UsersService;

    @Get()
    public getAllUser(): Promise<User[]> {
        return this.service.getAllUser();
    }

    @Get('username/:username')
    public getUserByUsername(@Param('username') username: string): Promise<User> {
        return this.service.getUserByUsername(username);
    }

    @Get('id/:id')
    getUser(@Param("id", ParseIntPipe) id): Promise<User> {
        return this.service.getUser(id);
    }

    @Get("param")
    getUserByQuery(@Query() query: { name: string, lastname: string }): string {
        return `Hello ${query.lastname} ${query.name}`;
    }

}