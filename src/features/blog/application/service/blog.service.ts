import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { BlogRepository } from '../../infrastructure/repository';
import { BlogAggregate } from '../../domain';

@Injectable()
export class BlogService {
  private readonly logger = new Logger(BlogService.name);
  constructor(private readonly blogRepository: BlogRepository) {}

  async saveBlog(blog: BlogAggregate): Promise<BlogAggregate> {
    this.logger.log(`Сохранение блога blogId: ${blog.id} в БД...`);
    blog.plainToInstance();
    return await this.blogRepository.save(blog);
  }

  async deleteBlog(id: string): Promise<void> {
    this.logger.log(`Удаление блога blogId: ${id} из БД`);
    await this.blogRepository.delete(id);
  }

  async getBlogById(id: string): Promise<BlogAggregate> {
    this.logger.log(`Поиск блога по id: ${id}`);
    const blog = await this.blogRepository.getById(id);
    if (!blog) {
      const message = `Блог blogId: ${id} не найден`;
      this.logger.log(message);
      throw new NotFoundException(message);
    }
    return blog;
  }

  async getAllBlogs(): Promise<[BlogAggregate[], number]> {
    this.logger.log(`Поиск всех блогов в БД`);
    return await this.blogRepository.getAll();
  }
}
