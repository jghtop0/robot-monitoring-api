import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Robot Monitoring API')
    .setDescription('Robot status and telemetry monitoring API')
    .setVersion('1.0')
    .addTag('robots')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, documentFactory, {
    customSiteTitle: 'Robot Monitoring API',
  });

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
