import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Comment } from '../entities/comment.entity';
import { Repository } from 'typeorm';
import { CreateCommentDto } from '../dtos/CreateComment.dto';
import { Posts } from 'src/posts/entities/post.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class CommentsService {

    constructor(
        @InjectRepository(Comment) private readonly commentRepository: Repository<Comment>,
        @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) {}

    async addCommentToPost(id: number, createCommentDto: CreateCommentDto) {
        const author = await this.userRepository.findOneBy({id})
        if(!author) throw new HttpException('User not found. Cannot create Comment', HttpStatus.BAD_REQUEST)
        const post = await this.postRepository.findOneBy({id})
        if(!post) throw new HttpException('Post not found. Cannot create Comment', HttpStatus.BAD_REQUEST)
        console.log(post);
        
        const createComment = this.commentRepository.create({
            content: createCommentDto.content,
            post: post,
            author,
            creationDate: new Date()
        })      

        await this.postRepository.save(post)
        await this.commentRepository.save(createComment)
            
        return {
            ...createComment
        }
    }

    async getAllcommentsUnderPost(id: number) {
        const post = await this.postRepository.findOneBy({id})

        return post.comments
    }

}
