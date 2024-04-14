import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { BlogService } from '../service';
import { CreateBlogType } from './types';

export class UpdateBlogCommand {
  constructor(
    public id: string,
    public createBlogDto: CreateBlogType,
  ) {}
}
@CommandHandler(UpdateBlogCommand)
export class UpdateBlogUseCase
  implements ICommandHandler<UpdateBlogCommand, void>
{
  private readonly logger = new Logger(UpdateBlogUseCase.name);

  constructor(private readonly blogService: BlogService) {}

  async execute({ id, createBlogDto }: UpdateBlogCommand): Promise<void> {
    this.logger.log('Обновление блога...');
    const blog = await this.blogService.getBlogById(id);
    blog.update(createBlogDto);
    await this.blogService.saveBlog(blog);
  }
}
