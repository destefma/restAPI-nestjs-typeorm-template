import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './typeORM/user/entitys/user.entity';
import { UsersController } from './typeORM/user/users.controller';
import { UsersModule } from './typeORM/user/users.module';
import { UsersService } from './typeORM/user/users.service';
import { AuthModule } from './typeORM/auth/auth.module';
import { AuthService } from './typeORM/auth/auth.service';
import { JwtService } from '@nestjs/jwt';
import { JwtStrategy } from './typeORM/auth/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './typeORM/auth/local.strategy';
import { RolesModule } from './typeORM/roles/roles.module';
import { RolesController } from './typeORM/roles/roles.controller';
import { RolesService } from './typeORM/roles/roles.service';
import { Role } from './typeORM/roles/entities/role.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: 5432,
      username: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
      database: process.env.POSTGRES_DATABASE,
      entities: [User, Role],
      synchronize: false,
    }),
    TypeOrmModule.forFeature([User, Role]),
    UsersModule,
    AuthModule,
    RolesModule],
  controllers: [AppController, UsersController, RolesController],
  providers: [AppService, UsersService, RolesService],
})
export class AppModule { }
