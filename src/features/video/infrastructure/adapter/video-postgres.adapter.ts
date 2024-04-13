import { Injectable, Logger } from '@nestjs/common';
import { VideosRepository } from '../repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from '../../../../db/typeorm/entity';
import { VideoAggregate } from '../../domain';
import { BaseAdapter } from '../../../../core/orms/typeorm/postgres';

@Injectable()
export class VideoPostgresAdapter
  extends BaseAdapter<VideoAggregate, VideoEntity>
  implements VideosRepository
{
  logger: Logger = new Logger(VideoPostgresAdapter.name);
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videosRepository: Repository<VideoEntity>,
  ) {
    super(videosRepository);
  }

  mapping(entity: VideoAggregate): VideoAggregate {
    return VideoAggregate.mapping(entity);
  }

  async getById(id: string): Promise<VideoAggregate | null> {
    return await this.findByOptions({ where: { id } });
  }
  async getAll(): Promise<[VideoAggregate[], number]> {
    return await this.findAll();
  }
}
