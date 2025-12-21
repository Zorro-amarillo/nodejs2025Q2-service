import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { LoggingService } from './common/logging/logging.service';
import { LoggingInterceptor } from './common/logging/interceptor/logging.interceptor';
import * as dotenv from 'dotenv';
import * as dotenvExpand from 'dotenv-expand';
import { AppModule } from './app.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';

const env = dotenv.config();
dotenvExpand.expand(env);

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  const loggingService = app.get(LoggingService);

  app.useLogger(loggingService);
  app.useGlobalInterceptors(new LoggingInterceptor(loggingService));
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalGuards(
    new JwtAuthGuard(app.get(JwtService), app.get(ConfigService)),
  );

  process.on('uncaughtException', (error) => {
    loggingService.error('Uncaught Exception', error.stack, 'Process');
  });

  process.on('unhandledRejection', (reason) => {
    loggingService.error('Unhandled Rejection', String(reason), 'Process');
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('REST API for Home Library Service')
    .setVersion('1.0')
    .build();

  const documentFactory = () =>
    SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('doc', app, documentFactory, {
    yamlDocumentUrl: 'api.yaml',
  });

  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
