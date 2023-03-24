import { User } from 'src/typeORM/user/entitys/user.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable } from 'typeorm';

@Entity("roles")
export class Role {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ select: false })
    name: string;

    @Column({ select: false })
    description: string;

    @ManyToMany(() => User, (user) => user.roles)
    users: User[];
}