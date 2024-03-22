import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { UpdateVideoType } from './types';
import { AVAILABLE_RESOLUTIONS } from '../../domain';
import { VideoService } from '../service';

export class UpdateVideoCommand {
  title: string;
  author: string;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
  canBeDownloaded: boolean;
  minAgeRestriction: number;
  publicationDate: Date;
  constructor(
    public id: number,
    updateVideoDto: UpdateVideoType,
  ) {
    this.title = updateVideoDto.title;
    this.author = updateVideoDto.title;
    this.availableResolutions = updateVideoDto.availableResolutions;
    this.canBeDownloaded = updateVideoDto.canBeDownloaded;
    this.minAgeRestriction = updateVideoDto.minAgeRestriction;
    this.publicationDate = new Date(updateVideoDto.publicationDate);
  }
}

@CommandHandler(UpdateVideoCommand)
export class UpdateVideoUseCase implements ICommandHandler<UpdateVideoCommand> {
  logger = new Logger(UpdateVideoUseCase.name);

  constructor(private readonly videoService: VideoService) {}
  async execute(command: UpdateVideoCommand): Promise<void> {
    const { id, ...updatedVideo } = command;
    this.logger.log(`Обновление информации видео id: ${id}`);
    const video = await this.videoService.getVideoById(id);
    video.update(updatedVideo);
    await this.videoService.saveVideo(video);
  }
}
