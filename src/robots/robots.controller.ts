import { Body, Controller, Get, Post } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import type { Robot } from './robots.service';

@Controller('robots')
export class RobotsController {
    constructor(private readonly robotsService: RobotsService) { }

    @Post()
    create(@Body() dto: CreateRobotDto): Robot {
        return this.robotsService.create(dto);
    }

    @Get()
    findAll(): Robot[] {
        return this.robotsService.findAll();
    }
}
