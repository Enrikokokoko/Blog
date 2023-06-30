import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateTagDto } from './dtos/UpdateTag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tag } from './entities/tags.entity';
import { Posts } from 'src/posts/entities/post.entity';

@Injectable()
export class TagsService {
    constructor(
        @InjectRepository(Tag) private readonly tagsRepository: Repository<Tag>,
        @InjectRepository(Posts) private readonly postsRepository: Repository<Posts>
    ) {

    }
    async AddTagsToPost(id: number, tag: UpdateTagDto) {
        const post = await this.postsRepository.findOneBy({ id });
        if (!post) {
          throw new HttpException('Post was not found', HttpStatus.BAD_REQUEST);
        }
        console.log(tag);
        console.log(post);
        console.log(post.tags);

        post.tags.push(tag.name)
        return this.postsRepository.save(post);
    }

    GetPostByTag() {

    }

    UpdateTag() {

    }
    DeleteTags() {

    }
}
