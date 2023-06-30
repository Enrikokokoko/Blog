import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { CreateCategoryDto } from '../dtos/CreateCategory.dto';
import { UpdateCategoryDto } from '../dtos/UpdateCategory.dto';
import { CategoryService } from '../services/category.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/role.guard';

@Controller('category')
export class CategoryController {
    
    constructor(private readonly categoryService: CategoryService) {}

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Post()
    createCategory(@Body() createCategoryDto: CreateCategoryDto) {
        return this.categoryService.createCategory(createCategoryDto) 
    } 

    @UseGuards(JwtAuthGuard)
    @Get()
    getCategories() {
        return this.categoryService.getCategories()
    }

    @UseGuards(JwtAuthGuard)
    @Get(':name')
    getPostByCategory(@Param('name') name: string) {
        return this.categoryService.getPostByCategory(name)
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Patch(':name')
    updateCategory(@Param('name') name: string, @Body() updateCategoryDto: CreateCategoryDto) {
        return this.categoryService.updateCategory(name, updateCategoryDto)
    }

    @UseGuards(JwtAuthGuard)
    @Roles('ADMIN')
    @UseGuards(RolesGuard)
    @Delete(':name')
    deleteCategory(@Param('name') name: string) {
        return this.categoryService.deleteCategory(name)
    }
}
