import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { BlogService } from '../service';

export class DeleteBlogCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeleteBlogCommand)
export class DeleteBlogUseCase
  implements ICommandHandler<DeleteBlogCommand, void>
{
  private readonly logger = new Logger(DeleteBlogUseCase.name);

  constructor(private readonly blogService: BlogService) {}
  async execute({ id }: DeleteBlogCommand): Promise<void> {
    this.logger.log('Удаление блога...');
    await this.blogService.getBlogById(id);
    await this.blogService.deleteBlog(id);
  }
}
