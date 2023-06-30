import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Posts } from "../../posts/entities/post.entity";

@Entity({ name: 'user_comments' })
export class Comment {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;
    
    @Column()
    content: string;

    @ManyToOne(() => User, (user) => user.comments, {
        onDelete: "CASCADE", orphanedRowAction: 'delete'
    })
    author: User;

    @ManyToOne(() => Posts, (post) => post.comments, {
        onDelete: "CASCADE", orphanedRowAction: 'delete'
    })
    post: Posts;

    @Column({ type: 'timestamp' })
    creationDate: Date;
}