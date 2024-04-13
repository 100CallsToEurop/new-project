import { FilterQuery, UpdateQuery } from 'mongoose';

export abstract class BaseRepository<T, E> {
  abstract save(schema: UpdateQuery<E>): Promise<T>;
  abstract saveMany(schemas: UpdateQuery<E[]>): Promise<void>;
  abstract findByOptions(filter?: FilterQuery<E>): Promise<T | null>;
  abstract findAll(filter?: FilterQuery<E>): Promise<[T[], number]>;
  abstract delete(id: string): Promise<void>;
  abstract deleteByOptions(filter?: FilterQuery<E>): Promise<void>;
  abstract softDelete(id: string): Promise<void>;
}
