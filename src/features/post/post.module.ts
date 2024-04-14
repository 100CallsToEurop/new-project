import { Module } from '@nestjs/common';
import { PostController } from './api/post.controller';
import { PostService } from './application/service';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { PostRepository } from './infrastructure/repository';
import {
  PostMongodbAdapter,
  PostPostgresAdapter,
} from './infrastructure/adapter';
import { PostEntity } from '../../db/typeorm/entity';
import { Post, PostSchema } from '../../db/mongoose/schemas';
import { BlogModule } from '../blog/blog.module';
import {
  CreateNewPostUseCase,
  DeletePostUseCase,
  UpdatePostUseCase,
} from './application/useCases';
import { PostQueryRepository } from './api/qwery-repository';

config({
  path: `.${process.env.NODE_ENV}.env`,
});
const configService = new ConfigService();

const useCases = [CreateNewPostUseCase, DeletePostUseCase, UpdatePostUseCase];
@Module({
  imports: [
    CqrsModule,
    configService.get('DB_ADAPTER') === 'mongodb'
      ? MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
      : TypeOrmModule.forFeature([PostEntity]),
    BlogModule,
  ],
  controllers: [PostController],
  providers: [
    PostService,
    PostQueryRepository,
    ...useCases,
    {
      provide: PostRepository,
      useClass:
        configService.get('DB_ADAPTER') === 'mongodb'
          ? PostMongodbAdapter
          : PostPostgresAdapter,
    },
  ],
  exports: [],
})
export class PostModule {}
