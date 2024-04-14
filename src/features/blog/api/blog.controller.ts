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
import { BlogQueryRepository } from './query-repository';
import { BlogViewModel } from './models/view';
import { BlogInputModel } from './models/input';
import {
  CreateNewBlogCommand,
  DeleteBlogCommand,
  UpdateBlogCommand,
} from '../application/useCases';
import { Public } from '../../../common/decorators';

@Controller('blogs')
export class BlogController {
  private readonly logger = new Logger(BlogController.name);

  constructor(
    private readonly commandBus: CommandBus,
    private readonly blogQueryRepository: BlogQueryRepository,
  ) {}

  @Post()
  async createNewBlog(
    @Body() createBlogDto: BlogInputModel,
  ): Promise<BlogViewModel> {
    this.logger.log('Попытка создания нового блога');
    return await this.commandBus.execute<CreateNewBlogCommand>(
      new CreateNewBlogCommand(createBlogDto),
    );
  }
  @HttpCode(204)
  @Delete(':id')
  async deleteBlog(@Param('id') id: string): Promise<void> {
    this.logger.log('Попытка удаления блога');
    await this.commandBus.execute<DeleteBlogCommand>(new DeleteBlogCommand(id));
  }

  @HttpCode(204)
  @Put(':id')
  async updateVideo(
    @Param('id') id: string,
    @Body() updateBlogDto: BlogInputModel,
  ): Promise<void> {
    this.logger.log('Попытка обновления блога');
    await this.commandBus.execute<UpdateBlogCommand>(
      new UpdateBlogCommand(id, updateBlogDto),
    );
  }

  @Public()
  @Get(':id')
  async getBlog(@Param('id') id: string): Promise<BlogViewModel> {
    this.logger.log('Попытка получения блога');
    return this.blogQueryRepository.getBlogById(id);
  }
  @Public()
  @Get()
  async getAllBlogs(): Promise<BlogViewModel[]> {
    this.logger.log('Попытка получения всех блогов');
    return await this.blogQueryRepository.getAllBlogs();
  }
}
