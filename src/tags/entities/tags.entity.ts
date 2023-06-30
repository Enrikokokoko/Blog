import { Posts } from "src/posts/entities/post.entity";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tags' })
export class Tag {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;

    @Column()
    name: string;
    
    @ManyToMany(() => Posts, (post) => post.tags)
    posts: Posts[]
}