import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { PostRepository } from '../repository';
import { BaseAdapter } from '../../../../core/orms/typeorm/postgres';
import { PostEntity } from '../../../../db/typeorm/entity';
import { PostAggregate } from '../../domain';

@Injectable()
export class PostPostgresAdapter
  extends BaseAdapter<PostAggregate, PostEntity>
  implements PostRepository
{
  logger: Logger = new Logger(PostPostgresAdapter.name);
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {
    super(postRepository);
  }

  async getById(id: string): Promise<PostAggregate> {
    return await this.findByOptions({ where: { id } });
  }
  async getAll(): Promise<[PostAggregate[], number]> {
    return await this.findAll();
  }

  mapping(entity: PostAggregate): PostAggregate {
    return PostAggregate.mapping(entity);
  }
}
