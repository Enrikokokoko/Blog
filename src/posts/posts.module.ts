import { Module } from '@nestjs/common';
import { PostsController } from './controllers/posts.controller';
import { PostsService } from './services/posts.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { Posts } from './entities/post.entity';
import { User } from 'src/users/entities/user.entity';
import { FilesModule } from 'src/files/files.module';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts, Comment, Category]), RolesModule, AuthModule, FilesModule],
  controllers: [PostsController],
  providers: [PostsService]
})
export class PostsModule {}
