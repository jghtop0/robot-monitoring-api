import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { Robot } from './entities/robot.entity';
import { CreateRobotStatusDto } from './dto/create-robot-status.dto';
import { RobotStatus } from './entities/robot-status.entity';
import { CreateRobotTelemetryDto } from './dto/create-robot-telemetry.dto';
import { RobotTelemetry } from './entities/robot-telemetry.entity';

@Controller('robots')
export class RobotsController {
  constructor(private readonly robotsService: RobotsService) {}

  @Post()
  async create(@Body() dto: CreateRobotDto): Promise<Robot> {
    return this.robotsService.create(dto);
  }

  @Get()
  async findAll(): Promise<Robot[]> {
    return this.robotsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Robot> {
    return this.robotsService.findOne(Number(id));
  }
  @Post(':id/status')
  async createStatus(
    @Param('id') id: string,
    @Body() dto: CreateRobotStatusDto,
  ): Promise<RobotStatus> {
    return this.robotsService.createStatus(Number(id), dto);
  }

  @Get(':id/status')
  async findLatestStatus(@Param('id') id: string): Promise<RobotStatus> {
    return this.robotsService.findLatestStatus(Number(id));
  }
  @Get(':id/history')
  async findStatusHistory(
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ): Promise<RobotStatus[]> {
    return this.robotsService.findStatusHistory(
      Number(id),
      limit ? Number(limit) : 10,
    );
  }
  @Post(':id/telemetry')
  async createTelemetry(
    @Param('id') id: string,
    @Body() dto: CreateRobotTelemetryDto,
  ): Promise<RobotTelemetry> {
    return this.robotsService.createTelemetry(Number(id), dto);
  }
  @Get(':id/telemetry/latest')
  async findLatestTelemetry(@Param('id') id: string): Promise<RobotTelemetry> {
    return this.robotsService.findLatestTelemetry(Number(id));
  }
  @Get(':id/telemetry/history')
  async findTelemetryHistory(
    @Param('id') id: string,
    @Query('limit') limit?: string,
  ): Promise<RobotTelemetry[]> {
    return this.robotsService.findTelemetryHistory(
      Number(id),
      limit ? Number(limit) : 10,
    );
  }
}
