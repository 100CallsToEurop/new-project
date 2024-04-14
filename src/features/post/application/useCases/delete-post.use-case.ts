import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { PostService } from '../service';

export class DeletePostCommand {
  constructor(public id: string) {}
}

@CommandHandler(DeletePostCommand)
export class DeletePostUseCase
  implements ICommandHandler<DeletePostCommand, void>
{
  private readonly logger = new Logger(DeletePostUseCase.name);

  constructor(private readonly postService: PostService) {}
  async execute({ id }: DeletePostCommand): Promise<void> {
    this.logger.log('Удаление поста...');
    await this.postService.getPostById(id);
    await this.postService.deletePost(id);
  }
}
