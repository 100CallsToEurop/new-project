import { NestFactory } from '@nestjs/core';
import { AppModule } from './features/app.module';
import { configApp } from './config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  configApp(app);
  const port = new ConfigService().get('PORT') || 5000;
  await app.listen(port, () => {
    console.log(`Server started on port: ${port}`);
  });
}
bootstrap();
