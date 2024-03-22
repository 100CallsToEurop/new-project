import { Injectable, Logger } from '@nestjs/common';
import { VideosRepository } from '../repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VideoEntity } from '../../../../db/typeorm/entity';
import { VideoAggregate } from '../../domain';

@Injectable()
export class VideoPostgresAdapter implements VideosRepository {
  logger: Logger = new Logger(VideoPostgresAdapter.name);
  constructor(
    @InjectRepository(VideoEntity)
    private readonly videosRepository: Repository<VideoEntity>,
  ) {}

  mapping(entity: VideoEntity): VideoAggregate {
    return VideoAggregate.mapping(entity);
  }

  async save(video: VideoAggregate): Promise<VideoAggregate> {
    const newVideo = await this.videosRepository.save(video);
    return this.mapping(newVideo);
  }
  async getById(id: number): Promise<VideoAggregate> {
    const video = await this.videosRepository.findOne({ where: { id } });
    return this.mapping(video);
  }
  async getAll(): Promise<[VideoAggregate[], number]> {
    const [videoEntities, count] = await this.videosRepository.findAndCount();
    const videos = videoEntities.map((video) => this.mapping(video));
    return [videos, count];
  }
  async deleteById(id: number): Promise<void> {
    await this.videosRepository.delete(id);
  }
}
