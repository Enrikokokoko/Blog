import { Exclude } from "class-transformer";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";


@Entity({ name: 'role' })
export class Role {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;

    @Column()
    value: string;

    @Column()
    description: string;
}