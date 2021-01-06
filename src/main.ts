import { NestFactory, Reflector } from '@nestjs/core';
// import { Request, Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import { AppModule } from './app';
import { logger } from './middleware';
import { ValidationPipe, ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  app.enableCors({
    origin: true,
    credentials: true
  });

  // app.use((_: Request, res: Response, next: any) => {
  //   res.header('Access-Control-Allow-Origin', 'http://localhost:1234');
  //   res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  //   res.header('Access-Control-Allow-Headers', 'Content-Type, Accept');
  //   res.header('Access-Control-Allow-Credentials', 'true');
  //   next();
  // });

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalInterceptors(new ClassSerializerInterceptor(
    app.get(Reflector))
  );

  app.setGlobalPrefix('api');

  const configService: ConfigService = app.get(ConfigService);

  const port = configService.get('server.port')

  const options = new DocumentBuilder()
    .setTitle('Authentication API')
    .setDescription('The authentication API description')
    .setVersion('0.0.1')
    .addTag('auth')
    .setTermsOfService('http://www.ramsy.it/tos.html')
    .setContact('Ramsy IT', 'http://www.ramsy.it', 'ramsy@ramsy.it')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.use(logger)
  app.use(cookieParser());


  await app.listen(port);
}
bootstrap();
