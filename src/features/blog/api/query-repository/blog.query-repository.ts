import { Injectable, Logger } from '@nestjs/common';
import { BlogService } from '../../application/service';
import { BlogAggregate } from '../../domain';
import { BlogViewModel } from '../models/view';

@Injectable()
export class BlogQueryRepository {
  private readonly logger = new Logger(BlogQueryRepository.name);

  constructor(private readonly blogService: BlogService) {}

  async getBlogById(id: string): Promise<BlogViewModel> {
    this.logger.log(`Поиск блога blogId: ${id}`);
    const blog = await this.blogService.getBlogById(id);
    return BlogAggregate.buildResponseBlog(blog);
  }

  async getAllBlogs(): Promise<BlogViewModel[]> {
    this.logger.log(`Поиск всех блогов`);
    const [blogs] = await this.blogService.getAllBlogs();
    return BlogAggregate.buildResponseBlogs(blogs);
  }
}
