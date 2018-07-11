import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';

async function bootstrap(port = 3000) {
  const app = await NestFactory.create(AppModule);
  app.useStaticAssets('public');
  app.enableCors();
  await app.listen(port);
}

bootstrap();
