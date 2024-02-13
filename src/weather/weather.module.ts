import { Module, type MiddlewareConsumer, type NestModule } from '@nestjs/common';
import { WeatherController } from './weather.controller';
import { WeatherService } from './weather.service';
import { HttpModule } from '@nestjs/axios';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { RequestLoggingMiddleware } from 'src/middlewares/requestLogging.middleware';
import { CustomLoggerService } from '../logger/logger.module';
// import { LoggerModule } from 'src/logger/logger.module';

@Module({
  imports: [
    HttpModule,
    CacheModule.register({
      ttl: 0,
      store: redisStore,
      host: 'localhost',
      port: 6379
    }),
  ],
  controllers: [WeatherController,],
  providers: [CustomLoggerService, WeatherService],
  exports: [WeatherService]
})
export class WeatherModule { }
