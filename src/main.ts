import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const corsConfig = {
  origin: '*',
  credential: true,
};

async function bootstrap() {
  const port = 5000;
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  app.enableCors(corsConfig);

  await app.listen(port);
  logger.log(`Nest Server Running on port ${port}`);
}

bootstrap();
