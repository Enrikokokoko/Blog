import { Module } from '@nestjs/common';
import { CategoryController } from './controllers/category.controller';
import { CategoryService } from './services/category.service';
import { Category } from './entities/category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';
import { Posts } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Category, Posts]), RolesModule, AuthModule],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
