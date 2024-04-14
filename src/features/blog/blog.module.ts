import { Module } from '@nestjs/common';
import { BlogController } from './api/blog.controller';
import { BlogService } from './application/service';
import { config } from 'dotenv';
import { ConfigService } from '@nestjs/config';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogRepository } from './infrastructure/repository';
import {
  BlogMongodbAdapter,
  BlogPostgresAdapter,
} from './infrastructure/adapter';
import { BlogEntity } from '../../db/typeorm/entity';
import { Blog, BlogSchema } from '../../db/mongoose/schemas';
import { BlogQueryRepository } from './api/query-repository';
import { CreateNewBlogUseCase, DeleteBlogUseCase, UpdateBlogUseCase } from './application/useCases';

config({
  path: `.${process.env.NODE_ENV}.env`,
});
const configService = new ConfigService();

const useCases = [CreateNewBlogUseCase, DeleteBlogUseCase, UpdateBlogUseCase];

@Module({
  imports: [
    CqrsModule,
    configService.get('DB_ADAPTER') === 'mongodb'
      ? MongooseModule.forFeature([{ name: Blog.name, schema: BlogSchema }])
      : TypeOrmModule.forFeature([BlogEntity]),
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    BlogQueryRepository,
    ...useCases,
    {
      provide: BlogRepository,
      useClass:
        configService.get('DB_ADAPTER') === 'mongodb'
          ? BlogMongodbAdapter
          : BlogPostgresAdapter,
    },
  ],
  exports: [BlogService],
})
export class BlogModule {}
