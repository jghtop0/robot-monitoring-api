import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Robot } from './robot.entity';

@Entity('robot_statuses')
export class RobotStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column()
  batteryLevel: number;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => Robot, (robot) => robot.statuses, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'robot_id' })
  robot: Robot;
}