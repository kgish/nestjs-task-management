import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';

import { VehicleStatus } from '../vehicle-status.enum';

export class GetVehiclesFilterDto {
  @IsOptional()
  @IsIn([VehicleStatus.READY, VehicleStatus.REPAIR, VehicleStatus.PARKED])
  status: VehicleStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}
