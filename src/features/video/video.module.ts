import { Module } from '@nestjs/common';
import { VideoController } from './api';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from '../../db/mongoose/schemas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from '../../db/typeorm/entity';
import { VideosRepository } from './infrastructure/repository';
import {
  VideoMongodbAdapter,
  VideoPostgresAdapter,
} from './infrastructure/adapter';
import { VideoService } from './application/service';
import {
  CreateVideoUseCase,
  DeleteVideoUseCase,
  UpdateVideoUseCase,
} from './application/useCases';
import { VideosQueryRepository } from './api/query-repository';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';

config({
  path: `.${process.env.NODE_ENV}.env`,
});
const configService = new ConfigService();

const useCases = [
  VideoService,
  VideosQueryRepository,
  CreateVideoUseCase,
  DeleteVideoUseCase,
  UpdateVideoUseCase,
];

@Module({
  imports: [
    CqrsModule,
    configService.get('DB_ADAPTER') === 'mongodb'
      ? MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
      : TypeOrmModule.forFeature([VideoEntity]),
  ],
  controllers: [VideoController],
  providers: [
    ...useCases,
    {
      provide: VideosRepository,
      useClass:
        configService.get('DB_ADAPTER') === 'mongodb'
          ? VideoMongodbAdapter
          : VideoPostgresAdapter,
    },
  ],
  exports: [],
})
export class VideoModule {}
