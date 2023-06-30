import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "../../posts/entities/post.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Role } from "src/roles/entities/role.entity";

@Entity({ name: 'users' })
export class User {

    @PrimaryGeneratedColumn({ type: 'bigint' })
    id: number;
    
    @Column({ unique: true })
    username: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({ type: 'timestamp' })
    registrationDate: Date;

    @Column({ nullable: true })
    profilePhoto: string;

    @OneToMany(() => Posts, (post) => post.author, { cascade: ["remove"] })
    posts: Posts[];

    @OneToMany(() => Comment, (comment) => comment.author, { cascade: ["remove"] })
    comments: Comment[];

    @ManyToMany(() => Role, role => role)
    @JoinTable() 
    roles: Role[]
}