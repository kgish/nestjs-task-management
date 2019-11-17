import { PipeTransform, BadRequestException } from '@nestjs/common';
import { VehicleStatus } from '../vehicle-status.enum';

export class VehicleStatusValidationPipe implements PipeTransform {
  readonly allowedStatuses = [
    VehicleStatus.READY,
    VehicleStatus.PARKED,
    VehicleStatus.REPAIR,
  ];

  transform(value: any) {
    value = value.toUpperCase();

    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`'${value}' is an invalid status`);
    }

    return value;
  }

  private isStatusValid(status: any) {
    const idx = this.allowedStatuses.indexOf(status);
    return idx !== -1;
  }
}
