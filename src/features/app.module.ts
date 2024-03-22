import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { TestingModule } from './testing/testing.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../db/typeorm/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../db/mongoose/config';
import { APP_FILTER } from '@nestjs/core';
import { AllExceptionsFilter } from '../common/filters';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    MongooseModule.forRootAsync(getMongoConfig()),
    VideoModule,
    TestingModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
