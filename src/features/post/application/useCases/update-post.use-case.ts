import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreatePostType } from './types';
import { PostService } from '../service';
import { BlogService } from '../../../blog/application/service';
export class UpdatePostCommand {
  constructor(
    public id: string,
    public createPostDto: CreatePostType,
  ) {}
}
@CommandHandler(UpdatePostCommand)
export class UpdatePostUseCase
  implements ICommandHandler<UpdatePostCommand, void>
{
  private readonly logger = new Logger(UpdatePostUseCase.name);

  constructor(
    private readonly postService: PostService,
    private readonly blogService: BlogService,
  ) {}

  async execute({ id, createPostDto }: UpdatePostCommand): Promise<void> {
    this.logger.log('Обновление поста...');
    const { blogId } = createPostDto;
    const { name } = await this.blogService.getBlogById(blogId);
    const post = await this.postService.getPostById(id);
    post.update({ ...createPostDto, blogName: name });
    await this.postService.savePost(post);
  }
}
