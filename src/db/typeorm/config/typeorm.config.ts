import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ENTITIES } from '../entity';
import { DataSource } from 'typeorm';

export const TypeOrmConfigService = (): TypeOrmModuleAsyncOptions => ({
  useFactory: (configService: ConfigService) => ({
    type: 'postgres',
    host: configService.get('PG_HOST'),
    port: +configService.get('PG_PORT'),
    username: configService.get('PG_USERNAME'),
    password: configService.get('PG_PASSWORD'),
    database: configService.get('PG_DATABASE'),
    entities: ENTITIES,
    synchronize: true,
  }),
  dataSourceFactory: async (options) => {
    return await new DataSource(options).initialize();
  },
  inject: [ConfigService],
  imports: [ConfigModule],
});
