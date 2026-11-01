import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Robot } from './robot.entity';

@Entity('robot_telemetries')
export class RobotTelemetry {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('float')
  temperature: number;

  @Column('float')
  humidity: number;

  @Column()
  soilMoisture: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Robot, (robot) => robot.telemetries, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'robot_id' })
  robot: Robot;
}
