import { TestingRepository } from '../repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { VideoEntity } from '../../../../db/typeorm/entity';
import { Repository } from 'typeorm';

@Injectable()
export class TestingPostgresAdapter implements TestingRepository {
  private readonly logger = new Logger(TestingPostgresAdapter.name);
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videosRepository: Repository<VideoEntity>,
  ) {}
  async deleteAllData(): Promise<void> {
    await this.videosRepository.clear();
  }
}
