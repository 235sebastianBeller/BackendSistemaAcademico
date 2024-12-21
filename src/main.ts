import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, 
      forbidNonWhitelisted: true,
      stopAtFirstError: true, 
    }),
  );

  const allowedOrigins = [
    'https://frontendsistemaacademico.onrender.com',
    'http://localhost:4200',
  ];

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('No permitido por CORS'));
      }
    },
    methods: 'GET,POST,PUT,DELETE,PATCH', 
    credentials: true 
  });



  await app.listen(3000);
}
bootstrap();
