import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);

  //console.log(process.env.NODE_ENV);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  }

  const serverConfig = config.get('server');
  //console.log(serverConfig);

  const port = process.env.PORT || serverConfig.port; //starts on the provided port |or| takes it from the config yaml file
  await app.listen(port);
  logger.log(`Application listening on port ${port}`);
}
bootstrap();
