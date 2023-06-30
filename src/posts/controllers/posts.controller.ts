import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { CreatePostDto } from '../dtos/CreatePost.dto';
import { PostsService } from '../services/posts.service';
import { UpdatePostDto } from '../dtos/UpdatePost.dto';
import { UpdateCategoryDto } from 'src/categories/dtos/UpdateCategory.dto';
import { UpdateTagDto } from 'src/tags/dtos/UpdateTag.dto';
import { Posts } from '../entities/post.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private postsService: PostsService) {};

    @UseGuards(JwtAuthGuard)
    @Post('post/:id')
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Param('id') id: number, @Body() createPostDto: CreatePostDto, @UploadedFile() image: any): Promise<Posts> {
        return this.postsService.createPost(id, createPostDto, image)
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    getPosts() {
        return this.postsService.getPosts()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':id')
    getPostById(@Param('id', ParseIntPipe) id: number) {
        return this.postsService.getPostById(id)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id')
    updataPost(@Param('id', ParseIntPipe) id: number, @Body() updatePostDto: UpdatePostDto) {
        return this.postsService.updataPost(id, updatePostDto)
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch(':id/categories')
    addCategories(@Param('id') id: number, @Body() categories: UpdateCategoryDto) {
        return this.postsService.addCategories(id, categories)
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/tags')
    addTags(@Param('id', ParseIntPipe) id: number, @Body() updateTagDto: UpdateTagDto[]) {
        return this.postsService.addTags(id, updateTagDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    deletePost(@Param('id') id:number) {
        return this.postsService.deletePost(id)
    }
}
