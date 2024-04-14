import { IBlog } from './blog.interface';
import { BlogService } from './service';
import {
  IsNotEmpty,
  IsString,
  IsUUID,
  Matches,
  MaxLength, MinLength,
  validateSync,
} from 'class-validator';
import { Logger } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { BlogResponseType } from '../application/useCases/types';

export class BlogAggregate extends BlogService implements IBlog {
  private readonly logger = new Logger(BlogAggregate.name);

  @IsString()
  @IsUUID()
  id: string;
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(15)
  name: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(500)
  description: string;
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  @Matches(
    '^https://([a-zA-Z0-9_-]+\\.)+[a-zA-Z0-9_-]+(\\/[a-zA-Z0-9_-]+)*\\/?$',
  )
  websiteUrl: string;
  static create(blog: Partial<IBlog>): BlogAggregate {
    const _blog = new BlogAggregate();
    _blog.id = randomUUID();
    _blog.name = blog.name;
    _blog.description = blog.description;
    _blog.websiteUrl = blog.websiteUrl;
    const error = validateSync(_blog);
    if (!!error.length) {
      error.forEach((e) => _blog.logger.error(e.constraints));
      throw new Error('Blog not valid');
    }
    return _blog;
  }

  static mapping(blog: Partial<IBlog>): BlogAggregate {
    const _blog = new BlogAggregate();
    _blog.id = blog.id;
    _blog.name = blog.name;
    _blog.description = blog.description;
    _blog.websiteUrl = blog.websiteUrl;

    const error = validateSync(_blog);
    if (!!error.length) {
      error.forEach((e) => _blog.logger.error(e.constraints));
      throw new Error('Blog not valid');
    }
    return _blog;
  }

  static buildResponseBlog(blog: BlogAggregate): BlogResponseType {
    return {
      id: blog.id,
      name: blog.name,
      description: blog.description,
      websiteUrl: blog.websiteUrl,
    };
  }

  static buildResponseBlogs(blogs: BlogAggregate[]): BlogResponseType[] {
    return blogs.map((blog) => this.buildResponseBlog(blog));
  }
}
