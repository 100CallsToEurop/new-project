import { FindManyOptions, FindOneOptions, FindOptionsWhere } from 'typeorm';

export abstract class BaseRepository<T, E> {
  abstract save(entity: T & E): Promise<T>;
  abstract saveMany(entity: T[] & E[]): Promise<void>;
  abstract findByOptions(findOneOptions?: FindOneOptions<E>): Promise<T | null>;
  abstract findAll(findOptions?: FindManyOptions<E>): Promise<[T[], number]>;
  abstract delete(id: string): Promise<boolean>;
  abstract deleteByOptions(findOptions: FindOptionsWhere<E>): Promise<boolean>;
  abstract softDelete(id: string): Promise<boolean>;
}
