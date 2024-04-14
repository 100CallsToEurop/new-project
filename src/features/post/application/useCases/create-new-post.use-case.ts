import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { CreatePostType, PostResponseType } from './types';
import { PostService } from '../service';
import { PostAggregate } from '../../domain';
import { BlogService } from '../../../blog/application/service';

export class CreateNewPostCommand {
  constructor(public createPostDto: CreatePostType) {}
}
@CommandHandler(CreateNewPostCommand)
export class CreateNewPostUseCase
  implements ICommandHandler<CreateNewPostCommand, PostResponseType>
{
  private readonly logger = new Logger(CreateNewPostUseCase.name);

  constructor(
    private readonly postService: PostService,
    private readonly blogService: BlogService,
  ) {}
  async execute({
    createPostDto,
  }: CreateNewPostCommand): Promise<PostResponseType> {
    this.logger.log('Создание нового блога...');
    const { blogId } = createPostDto;
    const { name } = await this.blogService.getBlogById(blogId);
    const newPost = PostAggregate.create({ ...createPostDto, blogName: name });
    await this.postService.savePost(newPost);
    return PostAggregate.buildResponsePost(newPost);
  }
}
