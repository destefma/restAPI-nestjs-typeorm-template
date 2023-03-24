import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Console } from 'console';
import { Observable, from } from 'rxjs';
import { Repository } from 'typeorm';
import { User } from './entitys/user.entity';

@Injectable()
export class UsersService {

    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ) { }

    async createUser(email: string, username: string, pass: string) : Promise<User>{

        let newUser = new User();
        newUser.email = email
        newUser.password = pass
        newUser.username = username
        
        const user = this.usersRepository.create(newUser);
        this.usersRepository.save<User>(user);

        return user;
    }

    async getAllUser(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async getUser(id: number): Promise<User> {
        return this.usersRepository.findOneBy({ id });
    }

    async existsByUsername(username: string): Promise<boolean> {
        return this.usersRepository.findOneBy({ username }) ? true : false;
    }
      
    async existsByEmail(email: string): Promise<boolean> {
        return this.usersRepository.findOneBy({ email }) ? true : false;
    }

    async getUserByUsername(username: string): Promise<User | undefined> {
        return this.usersRepository.findOneBy({ username });
    }

    async removeUser(id: string): Promise<void> {
        await this.usersRepository.delete(id);
    }
      

}