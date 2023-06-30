import { Posts } from "src/posts/entities/post.entity";
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user_categories' })
export class Category {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;
    
    @Column()
    name: string;

    @ManyToMany(() => Posts, (post) => post.categories)
    posts: Posts[]
}