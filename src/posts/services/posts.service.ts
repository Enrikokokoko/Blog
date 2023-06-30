import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/CreatePost.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { In, Repository } from 'typeorm';
import { Posts } from '../entities/post.entity';
import { UpdatePostDto } from '../dtos/UpdatePost.dto';
import { UpdateCategoryDto } from 'src/categories/dtos/UpdateCategory.dto';
import { UpdateTagDto } from 'src/tags/dtos/UpdateTag.dto';
import { Category } from 'src/categories/entities/category.entity';
import { FilesService } from 'src/files/services/files.service';

@Injectable()
export class PostsService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Posts) private readonly postRepository: Repository<Posts>,
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,    
        private fileService: FilesService
        ) {}
      
    async createPost(id: number, createPostDto: CreatePostDto, image: any): Promise<Posts> {
       const author = await this.userRepository.findOne({where: { id }})
       const fileName = await this.fileService.createFile(image)
       
       console.log(author, id);
       
       if(!author) throw new HttpException('User not found. Cannot create Post', HttpStatus.BAD_REQUEST)
       const newPost = this.postRepository.create({
            ...createPostDto,             
            author,
            creationDate: new Date(),
            image: fileName
       });    

       await this.postRepository.save(newPost)
       return newPost
    }

    getPosts() {
        return this.postRepository.find({relations: ['comments', 'categories', 'tags']})
    }

    getPostById(id: number) {
        return this.postRepository.findOneBy({id})
    }

    updataPost(id: number, updatePostDto: UpdatePostDto) {
        return this.postRepository.update({id}, {...updatePostDto})
    }
    
    async addCategories(id: number, categories: UpdateCategoryDto) {
        const post = await this.postRepository.findOneBy({ id });
        if (!post) {
          throw new HttpException('Post was not found', HttpStatus.BAD_REQUEST);
        }
        
        const existingCategories = await this.categoryRepository.find({ where: { name: In(categories.name) } })
        post.categories = existingCategories;
        return this.postRepository.save(post);
      }

    addTags(id: number, updateTagDto: UpdateTagDto[]) {

    }

    deletePost(id:number) {
        return this.postRepository.delete({id})
    }
}


