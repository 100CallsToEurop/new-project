import { CreateVideoType } from './types';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { IVideoResponse, VideoAggregate } from '../../domain';
import { VideoService } from '../service';

export class CreateVideoCommand {
  constructor(public createVideoDto: CreateVideoType) {}
}

@CommandHandler(CreateVideoCommand)
export class CreateVideoUseCase implements ICommandHandler<CreateVideoCommand> {
  logger = new Logger(CreateVideoUseCase.name);

  constructor(private readonly videoService: VideoService) {}
  async execute({
    createVideoDto,
  }: CreateVideoCommand): Promise<IVideoResponse> {
    this.logger.log(`Создание нового видео`);
    const newVideo = VideoAggregate.create(createVideoDto);
    await this.videoService.saveVideo(newVideo);
    return VideoAggregate.BuildResponseVideo(newVideo);
  }
}
