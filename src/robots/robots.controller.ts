import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RobotsService } from './robots.service';
import { CreateRobotDto } from './dto/create-robot.dto';
import { Robot } from './entities/robot.entity';

@Controller('robots')
export class RobotsController {
    constructor(private readonly robotsService: RobotsService) { }

    @Post()
    async create(@Body() dto: CreateRobotDto): Promise<Robot> {
        return this.robotsService.create(dto);
    }

    @Get()
    async findAll(): Promise<Robot[]> {
        return this.robotsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id:string): Promise<Robot> {
        return this.robotsService.findOne(Number(id));
    }
}
