import { TestingRepository } from '../repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BlogEntity,
  PostEntity,
  VideoEntity,
} from '../../../../db/typeorm/entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestingPostgresAdapter implements TestingRepository {
  private readonly logger = new Logger(TestingPostgresAdapter.name);
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videosRepository: Repository<VideoEntity>,
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
    @InjectRepository(BlogEntity)
    private readonly blogRepository: Repository<BlogEntity>,
  ) {}
  async deleteAllData(): Promise<void> {
    await this.videosRepository.clear();
    await this.postRepository.clear();
    await this.blogRepository.clear();
  }
}
