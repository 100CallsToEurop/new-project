import { Module } from '@nestjs/common';
import { VideoModule } from './video/video.module';
import { TestingModule } from './testing/testing.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '../db/typeorm/config';
import { MongooseModule } from '@nestjs/mongoose';
import { getMongoConfig } from '../db/mongoose/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { AllExceptionsFilter } from '../common/filters';
import { config } from 'dotenv';
import { BlogModule } from './blog/blog.module';
import { PostModule } from './post/post.module';
import { BasicStrategy } from './auth/strategies';
import { BasicAuthGuard } from '../common/guards';

config({
  path: `.${process.env.NODE_ENV}.env`,
});
const configService = new ConfigService();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.${process.env.NODE_ENV}.env`,
    }),
    configService.get('DB_ADAPTER') === 'mongodb'
      ? MongooseModule.forRootAsync(getMongoConfig())
      : TypeOrmModule.forRootAsync(TypeOrmConfigService()),
    VideoModule,
    TestingModule,
    BlogModule,
    PostModule,
  ],
  controllers: [],
  providers: [
    BasicStrategy,
    { provide: APP_GUARD, useClass: BasicAuthGuard },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
})
export class AppModule {}
