import { TestingRepository } from '../repository';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Video } from '../../../../db/mongoose/schemas';
import { Model } from 'mongoose';

@Injectable()
export class TestingMongodbAdapter implements TestingRepository {
  private readonly logger = new Logger(TestingMongodbAdapter.name);
  constructor(@InjectModel(Video.name) private videoModel: Model<Video>) {}
  async deleteAllData(): Promise<void> {
    await this.videoModel.deleteMany({});
  }
}
