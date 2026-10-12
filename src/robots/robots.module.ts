import { Module } from '@nestjs/common';
import { RobotsController } from './robots.controller';
import { RobotsService } from './robots.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Robot } from './entities/robot.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Robot])],
  controllers: [RobotsController],
  providers: [RobotsService]
})
export class RobotsModule {}
