import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { Comment } from "../../comments/entities/comment.entity";
import { Category } from "src/categories/entities/category.entity";
import { Tag } from "src/tags/entities/tags.entity";

@Entity({ name: 'user_posts' })
export class Posts {
    @PrimaryGeneratedColumn({ type: 'bigint'})
    id: number;
    
    @Column()
    title: string;

    @Column()
    content: string;

    @Column({ nullable: true })
    image: string;
  
    @Column({ type: 'timestamp' })
    creationDate: Date;

    @ManyToOne(() => User, (user) => user.posts, {
        onDelete: "CASCADE", orphanedRowAction: 'delete'
    })
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post, {cascade: ["remove"]})
    comments: Comment[];

    @ManyToMany(() => Category)
    @JoinTable()
    categories: Category[];

    @ManyToMany(() => Tag)
    @JoinTable()
    tags: Tag[];
}