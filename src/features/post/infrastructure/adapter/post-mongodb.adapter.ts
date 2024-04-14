import { Injectable, Logger } from '@nestjs/common';
import { PostRepository } from '../repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAdapter } from '../../../../core/orms/mongoose/mongodb/base.adapter';
import { Post } from '../../../../db/mongoose/schemas';
import { PostAggregate } from '../../domain';

@Injectable()
export class PostMongodbAdapter
  extends BaseAdapter<PostAggregate, Post>
  implements PostRepository
{
  logger: Logger = new Logger(PostMongodbAdapter.name);
  constructor(@InjectModel(Post.name) private postModel: Model<Post>) {
    super(postModel);
  }

  async getById(id: string): Promise<PostAggregate> {
    return await this.findByOptions({ _id: id });
  }
  async getAll(): Promise<[PostAggregate[], number]> {
    return await this.findAll();
  }

  mapping(schema: Post): PostAggregate {
    return PostAggregate.mapping(schema);
  }
}
