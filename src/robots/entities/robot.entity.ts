import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { RobotStatus } from './robot-status.entity';
import { RobotTelemetry } from './robot-telemetry.entity';

@Entity('robots')
export class Robot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => RobotStatus, (status) => status.robot)
  statuses: RobotStatus[];

  @OneToMany(() => RobotTelemetry, (telemetry) => telemetry.robot)
  telemetries: RobotTelemetry[];
}
