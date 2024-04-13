import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Logger,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { VideoViewModel } from './models/view';
import {
  CreateVideoCommand,
  DeleteVideoCommand,
  UpdateVideoCommand,
} from '../application/useCases';
import { CreateVideoInputModel, UpdateVideoInputModel } from './models/input';
import { VideosQueryRepository } from './query-repository';

@Controller('videos')
export class VideoController {
  logger = new Logger(VideoController.name);
  constructor(
    private readonly commandBus: CommandBus,
    private readonly videosQueryRepository: VideosQueryRepository,
  ) {}

  @Post()
  async createVideo(
    @Body() createVideoDto: CreateVideoInputModel,
  ): Promise<VideoViewModel> {
    this.logger.log('Попытка создания видео');
    return await this.commandBus.execute<CreateVideoCommand>(
      new CreateVideoCommand(createVideoDto),
    );
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteVideo(@Param('id') id: string): Promise<void> {
    this.logger.log('Попытка удаления видео');
    await this.commandBus.execute<DeleteVideoCommand>(
      new DeleteVideoCommand(id),
    );
  }

  @HttpCode(204)
  @Put(':id')
  async updateVideo(
    @Param('id') id: string,
    @Body() updateVideoDto: UpdateVideoInputModel,
  ): Promise<void> {
    this.logger.log('Попытка обновления видео');
    await this.commandBus.execute<UpdateVideoCommand>(
      new UpdateVideoCommand(id, updateVideoDto),
    );
  }

  @Get(':id')
  async getVideo(@Param('id') id: string): Promise<VideoViewModel> {
    this.logger.log('Попытка получения видео');
    return this.videosQueryRepository.getVideoById(id);
  }

  @Get()
  async getAllVideo(): Promise<VideoViewModel[]> {
    this.logger.log('Попытка получения всех видео');
    return await this.videosQueryRepository.getAllVideos();
  }
}
