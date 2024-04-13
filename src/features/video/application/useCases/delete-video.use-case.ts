import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { VideoService } from '../service';

export class DeleteVideoCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteVideoCommand)
export class DeleteVideoUseCase implements ICommandHandler<DeleteVideoCommand> {
  logger = new Logger(DeleteVideoUseCase.name);

  constructor(private readonly videoService: VideoService) {}
  async execute({ id }: DeleteVideoCommand): Promise<void> {
    this.logger.log(`Удаление видео id: ${id}`);
    const video = await this.videoService.getVideoById(id);
    await this.videoService.deleteVideo(video.id);
  }
}
