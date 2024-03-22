import { Module } from '@nestjs/common';
import { TestingController } from './api';
import { CqrsModule } from '@nestjs/cqrs';
import { MongooseModule } from '@nestjs/mongoose';
import { Video, VideoSchema } from '../../db/mongoose/schemas';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideoEntity } from '../../db/typeorm/entity';
import { TestingRepository } from './infrastructure/repository';
import {
  TestingMongodbAdapter,
  TestingPostgresAdapter,
} from './infrastructure/adapter';
import { DeleteAllDataUseCase } from './appplication/useCases';
import { ConfigService } from '@nestjs/config';

const useCases = [DeleteAllDataUseCase];
import { config } from 'dotenv';

config({
  path: `.${process.env.NODE_ENV}.env`,
});
const configService = new ConfigService();

@Module({
  imports: [
    CqrsModule,
    configService.get('DB_ADAPTER') === 'mongodb'
      ? MongooseModule.forFeature([{ name: Video.name, schema: VideoSchema }])
      : TypeOrmModule.forFeature([VideoEntity]),
  ],
  controllers: [TestingController],
  providers: [
    ...useCases,
    {
      provide: TestingRepository,
      useClass:
        configService.get('DB_ADAPTER') === 'mongodb'
          ? TestingMongodbAdapter
          : TestingPostgresAdapter,
    },
  ],
  exports: [],
})
export class TestingModule {}
