import { Injectable, Logger } from '@nestjs/common';
import { BlogRepository } from '../repository';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BaseAdapter } from '../../../../core/orms/mongoose/mongodb/base.adapter';
import { Blog } from '../../../../db/mongoose/schemas';
import { BlogAggregate } from '../../domain';

@Injectable()
export class BlogMongodbAdapter
  extends BaseAdapter<BlogAggregate, Blog>
  implements BlogRepository
{
  logger: Logger = new Logger(BlogMongodbAdapter.name);
  constructor(@InjectModel(Blog.name) private blogModel: Model<Blog>) {
    super(blogModel);
  }

  async getById(id: string): Promise<BlogAggregate> {
    return await this.findByOptions({ _id: id });
  }
  async getAll(): Promise<[BlogAggregate[], number]> {
    return await this.findAll();
  }

  mapping(schema: Blog): BlogAggregate {
    return BlogAggregate.mapping(schema);
  }
}
