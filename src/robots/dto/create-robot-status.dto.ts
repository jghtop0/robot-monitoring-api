import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';

export class CreateRobotStatusDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsInt()
  @Min(0)
  @Max(100)
  batteryLevel: number;
}
