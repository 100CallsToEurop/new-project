import { ConfigModule, ConfigService } from '@nestjs/config';

export const dbConnectFactory = () => ({
  useFactory: (configService: ConfigService) => ({

  }),
  inject: [ConfigService],
  imports: [ConfigModule],
});
