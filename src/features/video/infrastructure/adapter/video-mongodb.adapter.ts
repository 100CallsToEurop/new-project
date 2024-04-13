import { Injectable, Logger } from '@nestjs/common';
import { Video } from '../../../../db/mongoose/schemas';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { VideosRepository } from '../repository';
import { VideoAggregate } from '../../domain';
import { BaseAdapter } from '../../../../core/orms/mongoose/mongodb/base.adapter';

@Injectable()
export class VideoMongodbAdapter
  extends BaseAdapter<VideoAggregate, Video>
  implements VideosRepository
{
  logger: Logger = new Logger(VideoMongodbAdapter.name);
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {
    super(videoModel);
  }

  mapping(schema: Video): VideoAggregate {
    return VideoAggregate.mapping(schema);
  }

  async getById(id: string): Promise<VideoAggregate | null> {
    return await this.findByOptions({ _id: id });
  }
  async getAll(): Promise<[VideoAggregate[], number]> {
    return await this.findAll();
  }
}
