import { Injectable, Logger } from '@nestjs/common';
import { VideoViewModel } from '../models/view';
import { VideoAggregate } from '../../domain';
import { VideoService } from '../../application/service';

@Injectable()
export class VideosQueryRepository {
  logger = new Logger(VideosQueryRepository.name);
  constructor(private readonly videoService: VideoService) {}

  async getVideoById(id: number): Promise<VideoViewModel> {
    const video = await this.videoService.getVideoById(id);
    return VideoAggregate.BuildResponseVideo(video);
  }

  async getAllVideos(): Promise<VideoViewModel[]> {
    this.logger.log(`Поиск всех видео`);
    const [videos] = await this.videoService.getAllVideos();
    return videos.map((video) => VideoAggregate.BuildResponseVideo(video));
  }
}
