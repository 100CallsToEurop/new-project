import { PostAggregate } from '../../domain';
export abstract class PostRepository {
  abstract save(post: PostAggregate): Promise<PostAggregate>;
  abstract delete(id: string): Promise<boolean | void>;
  abstract getById(id: string): Promise<PostAggregate>;
  abstract getAll(): Promise<[PostAggregate[], number]>;
}
