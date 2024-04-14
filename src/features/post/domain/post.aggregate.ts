import { IPost } from './post.interface';
import { PostService } from './service';
import { Logger } from '@nestjs/common';
import {
  IsDate,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  validateSync,
} from 'class-validator';
import { randomUUID } from 'crypto';
import { PostResponseType } from '../application/useCases/types';

export class PostAggregate extends PostService implements IPost {
  private readonly logger = new Logger(PostAggregate.name);

  @IsString()
  @IsUUID()
  id: string;
  @IsNotEmpty()
  @MaxLength(30)
  title: string;
  @IsNotEmpty()
  @MaxLength(100)
  shortDescription: string;
  @IsNotEmpty()
  @MaxLength(1000)
  content: string;
  @IsNotEmpty()
  @IsUUID()
  blogId: string;
  @IsNotEmpty()
  @IsString()
  blogName: string;
  @IsNotEmpty()
  @IsDate()
  createdAt: Date;

  static create(post: Partial<IPost>): PostAggregate {
    const _post = new PostAggregate();
    _post.id = randomUUID();
    _post.title = post.title;
    _post.shortDescription = post.shortDescription;
    _post.content = post.content;
    _post.blogId = post.blogId;
    _post.blogName = post.blogName;
    _post.createdAt = new Date();

    const error = validateSync(_post);
    if (!!error.length) {
      error.forEach((e) => _post.logger.error(e.constraints));
      throw new Error('Post not valid');
    }
    return _post;
  }

  static mapping(post: Partial<IPost>): PostAggregate {
    const _post = new PostAggregate();
    _post.id = post.id;
    _post.title = post.title;
    _post.shortDescription = post.shortDescription;
    _post.content = post.content;
    _post.blogId = post.blogId;
    _post.blogName = post.blogName;
    _post.createdAt = post.createdAt;

    const error = validateSync(_post);
    if (!!error.length) {
      error.forEach((e) => _post.logger.error(e.constraints));
      throw new Error('Post not valid');
    }
    return _post;
  }

  static buildResponsePost(post: PostAggregate): PostResponseType {
    return {
      id: post.id,
      title: post.title,
      shortDescription: post.shortDescription,
      content: post.content,
      blogId: post.blogId,
      blogName: post.blogName,
      createdAt: post.createdAt.toISOString(),
    };
  }

  static buildResponsePosts(posts: PostAggregate[]): PostResponseType[] {
    return posts.map((post) => this.buildResponsePost(post));
  }
}
