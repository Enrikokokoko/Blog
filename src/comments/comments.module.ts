import { Module } from '@nestjs/common';
import { CommentsController } from './controllers/comments.controller';
import { CommentsService } from './services/comments.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Posts } from 'src/posts/entities/post.entity';
import { Comment } from './entities/comment.entity';
import { RolesModule } from 'src/roles/roles.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Posts, Comment]), RolesModule, AuthModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
