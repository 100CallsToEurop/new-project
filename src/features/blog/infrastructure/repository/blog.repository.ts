import { BlogAggregate } from '../../domain';

export abstract class BlogRepository {
  abstract save(blog: BlogAggregate): Promise<BlogAggregate>;
  abstract delete(id: string): Promise<boolean | void>;
  abstract getById(id: string): Promise<BlogAggregate>;
  abstract getAll(): Promise<[BlogAggregate[], number]>;
}
