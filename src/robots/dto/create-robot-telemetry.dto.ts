import { IsNumber } from 'class-validator';

export class CreateRobotTelemetryDto {
  @IsNumber()
  temperature: number;

  @IsNumber()
  humidity: number;

  @IsNumber()
  soilMoisture: number;
}
