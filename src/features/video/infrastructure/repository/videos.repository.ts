import { VideoAggregate } from '../../domain';

export abstract class VideosRepository {
  abstract save(video: VideoAggregate): Promise<VideoAggregate>;
  abstract getById(id: number): Promise<VideoAggregate>;
  abstract getAll(): Promise<[VideoAggregate[], number]>;
  abstract deleteById(id: number): Promise<void>;
}
