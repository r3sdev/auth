import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users';
import { configuration, validSchema } from '../config';
import { AuthModule } from '../auth';
import { APP_FILTER } from '@nestjs/core';
import { ExceptionsLoggerFilter } from '../utils/exceptions-logger.filter';
import { DatabaseModule } from '../database';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development'],
      isGlobal: true,
      load: [configuration],
      validationSchema: validSchema,
      validationOptions: {
        // allowUnknown: false,
        // abortEarly: true,
      },
    }),
    DatabaseModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: ExceptionsLoggerFilter,
    },
  ],
})
export class AppModule { }
