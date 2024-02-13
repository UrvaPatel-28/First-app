import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';

import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({ transform: true }))

  await app.listen(3000);
  // app.use(
  //   session({
  //     name: "Urvaa",
  //     secret: process.env.SESSION_SECRET_KEY,
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       maxAge: 60000,
  //     }
  //   })
  // )
  // app.use(passport.initialize());
  // app.use(passport.session());

}
bootstrap();
