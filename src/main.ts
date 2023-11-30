import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import { AppConfigService } from './config/app/config.service';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const app: NestExpressApplication =
    await NestFactory.create<NestExpressApplication>(AppModule, {
      rawBody: true,
      bodyParser: true,
    });

  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.enableCors();
  app.setGlobalPrefix('api/v1/'); // set the Global API path
  app.enableCors({
    origin: true,
    methods: ['GET', 'POST'],
    credentials: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const appConfigService: AppConfigService = app.get(AppConfigService);
  const port: number = +appConfigService.port || 3000;

  await app.listen(port, appConfigService.url, () =>
    console.log(`App is listening on port: ${port}`),
  );

  // Gracefully shutdown the server.
  app.enableShutdownHooks();
}

bootstrap().then((err) => console.log(err));
