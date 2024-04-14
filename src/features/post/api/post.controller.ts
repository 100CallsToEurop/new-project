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
import { PostViewModel } from './models/view';
import {
  CreateNewPostCommand,
  DeletePostCommand,
  UpdatePostCommand,
} from '../application/useCases';
import { PostInputModel } from './models/input';
import { PostQueryRepository } from './qwery-repository';
import { Public } from '../../../common/decorators';

@Controller('posts')
export class PostController {
  private readonly logger = new Logger(PostController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly postQueryRepository: PostQueryRepository,
  ) {}

  @Post()
  async createNewPost(
    @Body() createPostDto: PostInputModel,
  ): Promise<PostViewModel> {
    this.logger.log('Попытка создания нового поста');
    return await this.commandBus.execute<CreateNewPostCommand>(
      new CreateNewPostCommand(createPostDto),
    );
  }
  @HttpCode(204)
  @Delete(':id')
  async deletePost(@Param('id') id: string): Promise<void> {
    this.logger.log('Попытка удаления поста');
    await this.commandBus.execute<DeletePostCommand>(new DeletePostCommand(id));
  }

  @HttpCode(204)
  @Put(':id')
  async updateVideo(
    @Param('id') id: string,
    @Body() updatePostDto: PostInputModel,
  ): Promise<void> {
    this.logger.log('Попытка обновления поста');
    await this.commandBus.execute<UpdatePostCommand>(
      new UpdatePostCommand(id, updatePostDto),
    );
  }
  @Public()
  @Get(':id')
  async getPost(@Param('id') id: string): Promise<PostViewModel> {
    this.logger.log('Попытка получения поста');
    return this.postQueryRepository.getPostById(id);
  }
  @Public()
  @Get()
  async getAllPosts(): Promise<PostViewModel[]> {
    this.logger.log('Попытка получения всех постов');
    return await this.postQueryRepository.getAllPosts();
  }
}
