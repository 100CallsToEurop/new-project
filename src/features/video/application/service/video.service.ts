import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { VideosRepository } from '../../infrastructure/repository';
import { VideoAggregate } from '../../domain';
@Injectable()
export class VideoService {
  logger = new Logger(VideoService.name);
  constructor(private readonly videosRepository: VideosRepository) {}

  async saveVideo(video: VideoAggregate): Promise<VideoAggregate> {
    this.logger.log(
      video.id
        ? `Сохранение видео id: ${video.id} в БД`
        : `Сохранение нового видео в БД`,
    );
    video.plainToInstance();
    return await this.videosRepository.save(video);
  }

  async deleteVideo(id: number): Promise<void> {
    this.logger.log(`Удаление видео id: ${id} из БД`);
    return await this.videosRepository.deleteById(id);
  }

  async getVideoById(id: number): Promise<VideoAggregate> {
    this.logger.log(`Поиск видео по id: ${id}`);
    const video = await this.videosRepository.getById(id);
    if (!video) {
      const message = 'Видео не найдено';
      this.logger.log(message);
      throw new NotFoundException(message);
    }
    return video;
  }

  async getAllVideos(): Promise<[VideoAggregate[], number]> {
    this.logger.log(`Поиск всех видео в БД`);
    return await this.videosRepository.getAll();
  }
}
