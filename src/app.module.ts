import { MiddlewareConsumer, Module, ValidationPipe, type NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { User } from "src/db/entities/user.entity";
import { AuthModule } from './auth/auth.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { LoggingInteceptor } from './Interceptors/llogging.interceptor';
import { CustomHttpExceptionFilter } from './Exceptions/http.exception.filter';
import { TaskModule } from './task/task.module';
import { Task } from './db/entities/task.entity';
import { Log } from './db/entities/log.entity';
import { WeatherModule } from './weather/weather.module';
import { RequestLoggingMiddleware } from './middlewares/requestLogging.middleware';
import { WeatherController } from './weather/weather.controller';
import { LogsModule } from './logs/logs.module';
import { loggingInterceptor } from './Interceptors/logging.interceptor';
import { LogsService } from './logs/logs.service';
import { UserFetcherMiddleware } from './middlewares/user-fetcher.middleware';
import { JwtStrategy } from './auth/jwt.strategy';
import { JwtService } from '@nestjs/jwt';
import { ProductModule } from './product/product.module';
import { Product } from './db/entities/product.entity';
// import { LoggerModule } from './logger/logger.module';






@Module({
  imports:
    [

      ConfigModule.forRoot({
        isGlobal: true,
      }),
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        synchronize: true,
        entities: [User, Task, Log, Product],

      }),
      UserModule,
      AuthModule,
      TaskModule,
      WeatherModule,
      LogsModule,

      ProductModule
    ],
  providers: [
    // { provide: APP_INTERCEPTOR, useClass: LoggingInteceptor },
    { provide: APP_INTERCEPTOR, useClass: loggingInterceptor },
    { provide: APP_FILTER, useClass: CustomHttpExceptionFilter },
    JwtStrategy,
    JwtService

  ],
  controllers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(UserFetcherMiddleware)
      .forRoutes('*');
  }
}

