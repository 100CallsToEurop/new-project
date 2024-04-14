import { TestingRepository } from '../repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog, Post, Video } from '../../../../db/mongoose/schemas';
import { Model } from 'mongoose';

@Injectable()
export class TestingMongodbAdapter implements TestingRepository {
  private readonly logger = new Logger(TestingMongodbAdapter.name);
  constructor(
    @InjectModel(Video.name) private videoModel: Model<Video>,
    @InjectModel(Blog.name) private blogModel: Model<Blog>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}
  async deleteAllData(): Promise<void> {
    await this.videoModel.deleteMany({});
    await this.blogModel.deleteMany({});
    await this.postModel.deleteMany({});
  }
}
