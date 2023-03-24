import { Role } from 'src/typeORM/roles/entities/role.entity';
import { Entity, Column, PrimaryGeneratedColumn, JoinTable, ManyToMany } from 'typeorm';

@Entity("users")
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    firstname: string;

    @Column()
    lastname: string;

    @Column()
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(() => Role, (role) => role.users, { eager: true })
    @JoinTable({
        name: "user_roles",
        joinColumns: [{ name: "user_id", referencedColumnName: "id" }],
        inverseJoinColumns: [{ name: "role_id", referencedColumnName: "id" }]
    })
    roles: Role[];
}