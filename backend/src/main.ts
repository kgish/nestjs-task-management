import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';

// Config uses NODE_ENV or development if not defined.
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  if (process.env.NODE_ENV === 'development') {
    logger.log('Cors enabled');
    app.enableCors();
  }

  const serverConfig = config.get('server');

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);

  logger.log(`Application listening on port ${ port }`);
}

bootstrap();
