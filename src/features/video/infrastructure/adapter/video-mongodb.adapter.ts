import { Injectable, Logger } from '@nestjs/common';
import { Video } from '../../../../db/mongoose/schemas';
import { Model, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { VideosRepository } from '../repository';
import { VideoAggregate } from '../../domain';

@Injectable()
export class VideoMongodbAdapter implements VideosRepository {
  logger: Logger = new Logger(VideoMongodbAdapter.name);
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}

  mapping(entity: Video): VideoAggregate {
    return VideoAggregate.mapping(entity);
  }

  async save(video: VideoAggregate): Promise<VideoAggregate> {
    let newVideo;
    const checkVideo = await this.videoModel.findOne({ id: video.id }).exec();
    if (checkVideo) {
      newVideo = await this.videoModel.findOneAndUpdate(
        { id: video.id },
        video,
        { new: true },
      );
    } else {
      newVideo = new this.videoModel(video);
      newVideo._id = new Types.ObjectId();
      await newVideo.save();
    }
    return this.mapping(newVideo);
  }
  async getById(id: number): Promise<VideoAggregate> {
    const video = await this.videoModel.findOne({ id }).exec();
    return video ? this.mapping(video) : null;
  }
  async getAll(): Promise<[VideoAggregate[], number]> {
    const videoModels = await this.videoModel.find().exec();
    const videos = videoModels.map((video) => this.mapping(video));
    return [videos, videoModels.length];
  }
  async deleteById(id: number): Promise<void> {
    await this.videoModel.findOneAndDelete({ id }).exec();
  }
}
