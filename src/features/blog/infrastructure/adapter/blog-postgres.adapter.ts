import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseAdapter } from '../../../../core/orms/typeorm/postgres';
import { BlogRepository } from '../repository';
import { BlogEntity } from '../../../../db/typeorm/entity';
import { BlogAggregate } from '../../domain';

@Injectable()
export class BlogPostgresAdapter
  extends BaseAdapter<BlogAggregate, BlogEntity>
  implements BlogRepository
{
  logger: Logger = new Logger(BlogPostgresAdapter.name);
  constructor(
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {
    super(blogRepository);
  }

  async getById(id: string): Promise<BlogAggregate> {
    return await this.findByOptions({ where: { id } });
  }
  async getAll(): Promise<[BlogAggregate[], number]> {
    return await this.findAll();
  }

  mapping(entity: BlogAggregate): BlogAggregate {
    return BlogAggregate.mapping(entity);
  }
}
