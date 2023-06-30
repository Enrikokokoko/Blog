import { Module } from '@nestjs/common';
import { TagsController } from './tags.controller';
import { TagsService } from './tags.service';
import { Tag } from './entities/tags.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Posts } from 'src/posts/entities/post.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tag, Posts])],
  controllers: [TagsController],
  providers: [TagsService]
})
export class TagsModule {}
