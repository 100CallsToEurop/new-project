import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { BlogResponseType, CreateBlogType } from './types';
import { Logger } from '@nestjs/common';
import { BlogService } from '../service';
import { BlogAggregate } from '../../domain';

export class CreateNewBlogCommand {
  constructor(public createBlogDto: CreateBlogType) {}
}
@CommandHandler(CreateNewBlogCommand)
export class CreateNewBlogUseCase
  implements ICommandHandler<CreateNewBlogCommand, BlogResponseType>
{
  private readonly logger = new Logger(CreateNewBlogUseCase.name);

  constructor(private readonly blogService: BlogService) {}
  async execute({
    createBlogDto,
  }: CreateNewBlogCommand): Promise<BlogResponseType> {
    this.logger.log('Создание нового блога...');
    const newBlog = BlogAggregate.create(createBlogDto);
    await this.blogService.saveBlog(newBlog);
    return BlogAggregate.buildResponseBlog(newBlog);
  }
}
