export type SoilMoistureStatus =
  'TOO_WET' | 'NORMAL' | 'NEED_WATER' | 'SENSOR_ERROR';

export function determineSoilMoistureStatus(
  soilMoisture: number,
): SoilMoistureStatus {
  if (soilMoisture < 0 || soilMoisture > 4095) {
    return 'SENSOR_ERROR';
  }

  if (soilMoisture <= 1199) {
    return 'TOO_WET';
  }

  if (soilMoisture <= 2599) {
    return 'NORMAL';
  }

  return 'NEED_WATER';
}
