import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateRobotDto } from './dto/create-robot.dto';

export interface Robot {
    id: number;
    name: string;
    createdAt: string;
}

@Injectable()
export class RobotsService {
    private readonly robots: Robot[] = [];
    private nextId = 1;

    create(dto: CreateRobotDto): Robot {
        if (typeof dto?.name !== 'string' || dto.name.trim() === '') {
            throw new BadRequestException('로봇 이름을 입력해 주세요.');
        }

        const robot: Robot = {
            id: this.nextId++, //사용할 번호
            name: dto.name.trim(), //이름 앞뒤의 공백 제거
            createdAt: new Date().toISOString(),
        };

        this.robots.push(robot); //생성한 로봇 배열에 추가

        return robot;
    }

    findAll(): Robot[] {
        return this.robots;
    }


}
