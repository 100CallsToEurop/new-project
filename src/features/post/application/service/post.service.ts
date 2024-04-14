import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PostRepository } from '../../infrastructure/repository';
import { PostAggregate } from '../../domain';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);
  constructor(private readonly postRepository: PostRepository) {}

  async savePost(post: PostAggregate): Promise<PostAggregate> {
    this.logger.log(`Сохранение поста postId: ${post.id} в БД...`);
    post.plainToInstance();
    return await this.postRepository.save(post);
  }

  async deletePost(id: string): Promise<void> {
    this.logger.log(`Удаление поста postId: ${id} из БД`);
    await this.postRepository.delete(id);
  }

  async getPostById(id: string): Promise<PostAggregate> {
    this.logger.log(`Поиск поста по id: ${id}`);
    const post = await this.postRepository.getById(id);
    if (!post) {
      const message = `Пост postId: ${id} не найден`;
      this.logger.log(message);
      throw new NotFoundException(message);
    }
    return post;
  }

  async getAllPosts(): Promise<[PostAggregate[], number]> {
    this.logger.log(`Поиск всех постов в БД`);
    return await this.postRepository.getAll();
  }
}
