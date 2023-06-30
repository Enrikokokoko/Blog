import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { Posts } from './posts/entities/post.entity';
import { Comment } from './comments/entities/comment.entity';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { CommentsModule } from './comments/comments.module';
import { CategoryModule } from './categories/category.module';
import { TagsModule } from './tags/tags.module';
import { Category } from './categories/entities/category.entity';
import { ConfigModule } from '@nestjs/config';
import { MYSQL_DB, MYSQL_HOST, MYSQL_PASSWORD, MYSQL_PORT, MYSQL_USER } from './config';
import { RolesModule } from './roles/roles.module';
import { Role } from './roles/entities/role.entity';
import { FilesModule } from './files/files.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import * as path from 'path';
import { Tag } from './tags/entities/tags.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env'
    }),
    ServeStaticModule.forRoot({
      rootPath: path.resolve(__dirname, 'files/static')
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: MYSQL_HOST,
      port: parseInt(MYSQL_PORT),
      username: MYSQL_USER,
      password: MYSQL_PASSWORD,
      database: MYSQL_DB,
      entities: [User, Posts, Comment, Category, Tag, Role], 
      autoLoadEntities: true, 
      synchronize: true,
    }),
    UsersModule,
    AuthModule,
    PostsModule,
    CommentsModule,
    CategoryModule,
    TagsModule,
    RolesModule,
    FilesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
