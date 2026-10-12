import { 
    BadRequestException, 
    Injectable,
    NotAcceptableException,
    NotFoundException,
} from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';
import { InjectRepository } from '@nestjs/typeorm';

import { Robot } from './entities/robot.entity';
import { Repository } from 'typeorm';



@Injectable()
export class RobotsService {
    constructor(
        @InjectRepository(Robot)
        private readonly robotRepository: Repository<Robot>,
    ) {}

    async create(dto: CreateRobotDto): Promise<Robot> {
        if (typeof dto?.name !== 'string' || dto.name.trim() === '') {
        throw new BadRequestException("로봇 이름을 입력해 주세요.");
    }

    const robot = this.robotRepository.create({
        name:  dto.name.trim(),
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

        if(!robot) {
            throw new NotFoundException('로봇을 찾을 수 없습니다.');
        }
        return robot;
    }


}
