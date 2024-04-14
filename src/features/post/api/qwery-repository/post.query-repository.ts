import { Injectable, Logger } from '@nestjs/common';
import { PostAggregate } from '../../domain';
import { PostViewModel } from '../models/view';
import { PostService } from '../../application/service';

@Injectable()
export class PostQueryRepository {
  private readonly logger = new Logger(PostQueryRepository.name);

  constructor(private readonly postService: PostService) {}

  async getPostById(id: string): Promise<PostViewModel> {
    this.logger.log(`Поиск поста postId: ${id}`);
    const post = await this.postService.getPostById(id);
    return PostAggregate.buildResponsePost(post);
  }

  async getAllPosts(): Promise<PostViewModel[]> {
    this.logger.log(`Поиск всех постов`);
    const [posts] = await this.postService.getAllPosts();
    return PostAggregate.buildResponsePosts(posts);
  }
}
