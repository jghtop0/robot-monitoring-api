import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RobotsModule } from './robots/robots.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robot } from './robots/entities/robot.entity';
import { RobotStatus } from './robots/entities/robot-status.entity';
import { RobotTelemetry } from './robots/entities/robot-telemetry.entity';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        type: 'mysql',
        host: ConfigService.get<string>('DB_HOST'),
        port: Number(ConfigService.get<string>('DB_PORT')),
        username: ConfigService.get<string>('DB_USERNAME'),
        password: ConfigService.get<string>('DB_PASSWORD'),
        database: ConfigService.get<string>('DB_DATABASE'),
        entities: [Robot, RobotStatus, RobotTelemetry],
        synchronize: true,
      }),
    }),

    RobotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
