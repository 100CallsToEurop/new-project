import { VideoAggregate } from '../../domain';

export abstract class VideosRepository {
  abstract save(video: VideoAggregate): Promise<VideoAggregate>;
  abstract delete(id: string): Promise<boolean | void>;
  abstract getById(id: string): Promise<VideoAggregate | null>;
  abstract getAll(): Promise<[VideoAggregate[], number]>;
}
