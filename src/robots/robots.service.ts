import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { CreateRobotDto } from './dto/create-robot.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Robot } from './entities/robot.entity';
import { Repository } from 'typeorm';
import { RobotStatus } from './entities/robot-status.entity';
import { CreateRobotStatusDto } from './dto/create-robot-status.dto';
import { RobotTelemetry } from './entities/robot-telemetry.entity';
import { CreateRobotTelemetryDto } from './dto/create-robot-telemetry.dto';

@Injectable()
export class RobotsService {
  constructor(
    @InjectRepository(Robot)
    private readonly robotRepository: Repository<Robot>,

    @InjectRepository(RobotStatus)
    private readonly robotStatusRepository: Repository<RobotStatus>,

    @InjectRepository(RobotTelemetry)
    private readonly robotTelemetryRepository: Repository<RobotTelemetry>,
  ) {}

  async create(dto: CreateRobotDto): Promise<Robot> {
    if (typeof dto?.name !== 'string' || dto.name.trim() === '') {
      throw new BadRequestException('로봇 이름을 입력해 주세요.');
    }

    const robot = this.robotRepository.create({
      name: dto.name.trim(),
    });

    return this.robotRepository.save(robot);
  }

  async findAll(): Promise<Robot[]> {
    return this.robotRepository.find();
  }

  async findOne(id: number): Promise<Robot> {
    const robot = await this.robotRepository.findOne({
      where: { id },
    });

    if (!robot) {
      throw new NotFoundException('로봇을 찾을 수 없습니다.');
    }
    return robot;
  }
  async createStatus(
    robotId: number,
    dto: CreateRobotStatusDto,
  ): Promise<RobotStatus> {
    const robot = await this.findOne(robotId);

    const robotStatus = this.robotStatusRepository.create({
      status: dto.status,
      batteryLevel: dto.batteryLevel,
      robot,
    });

    return this.robotStatusRepository.save(robotStatus);
  }

  async findLatestStatus(robotId: number): Promise<RobotStatus> {
    await this.findOne(robotId);

    const status = await this.robotStatusRepository.findOne({
      where: {
        robot: { id: robotId },
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!status) {
      throw new NotFoundException('로봇 상태 이력이 없습니다.');
    }

    return status;
  }

  async findStatusHistory(
    robotId: number,
    limit: number,
  ): Promise<RobotStatus[]> {
    await this.findOne(robotId);

    return this.robotStatusRepository.find({
      where: {
        robot: { id: robotId },
      },
      order: {
        createdAt: 'DESC',
        id: 'DESC',
      },
      take: limit,
    });
  }

  async createTelemetry(
    robotId: number,
    dto: CreateRobotTelemetryDto,
  ): Promise<RobotTelemetry> {
    const robot = await this.findOne(robotId);

    const telemetry = this.robotTelemetryRepository.create({
      temperature: dto.temperature,
      humidity: dto.humidity,
      soilMoisture: dto.soilMoisture,
      robot,
    });

    return this.robotTelemetryRepository.save(telemetry);
  }
}
