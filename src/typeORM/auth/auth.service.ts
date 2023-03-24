
import { HttpCode, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entitys/user.entity';
import { UsersService } from '../user/users.service';
import { JwtStrategy } from './jwt.strategy';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async validateUser(username: string, pass: string): Promise<User> {

        const user = await this.usersService.getUserByUsername(username);
        if (user && user.password === pass) {
            user.password = null;
            return user;
        }
        return null;
    }

    async login(user: User) {

        const payload = { username: user.username, sub: user.id };
        const token = this.jwtService.sign(payload, { expiresIn: '20m' });
        return {
            userid: user.id,
            username: user.username,
            access_token: token,
            roles: user.roles
        };
    }

    async register(email: string, username: string, password: string) {

        const isEmailExist = await this.usersService.existsByEmail(email);
        const isUsernameExist = await this.usersService.existsByUsername(username);

        if (email === undefined || email == null || email?.length <= 0 ) return null;
        if (password === undefined || password == null || password?.length <= 0 ) return null;
        if (username === undefined || username == null || username?.length <= 0 ) return null;

        if (( isEmailExist !== undefined || !isEmailExist ) && (isUsernameExist !== undefined || !isUsernameExist)) {
            try {
                return await this.usersService.createUser(email, username, password);
            } catch (error) {
                return error;
            }
        }
        return HttpErrorByCode[406];
    }

    async verifyToken(userId: string, token: string) {
        try {
          const payload = await this.jwtService.verifyAsync(token);
    
          if (payload.userId !== userId) {
            return false;
          }
    
          return true;
        } catch (error) {
          throw new UnauthorizedException();
        }
      }
}