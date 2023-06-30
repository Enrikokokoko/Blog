import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from '../entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dtos/CreateCategory.dto';
import { Posts } from 'src/posts/entities/post.entity';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category) private readonly categoryRepository: Repository<Category>,
        @InjectRepository(Posts) private readonly postsRepository: Repository<Posts>
        ) {}
    
    createCategory(createCategoryDto: CreateCategoryDto) {
        const category = this.categoryRepository.create(createCategoryDto)

        return this.categoryRepository.save(category)
    }

    getCategories() {
        return this.categoryRepository.find()
    }

    async getPostByCategory(categoryName: string) {
        const posts = await this.postsRepository.createQueryBuilder('post')
        .innerJoin('post.categories', 'category', 'category.name = :categoryName', { categoryName })
        .getMany();

        if(!posts) {
            throw new HttpException('Posts with these categories were not found', HttpStatus.BAD_REQUEST)
        }

        return posts
    }

    updateCategory(name: string, updateCategoryDto: CreateCategoryDto) {
        return this.categoryRepository.update({name}, { ...updateCategoryDto })
    }

    deleteCategory(name: string) {
        return this.categoryRepository.delete({name})
    }
}
