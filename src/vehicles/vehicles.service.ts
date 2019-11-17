import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { GetVehiclesFilterDto } from './dto/get-vehicles-filter.dto';
import { VehicleRepository } from './vehicle.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { VehicleStatus } from './vehicle-status.enum';
import { User } from '../auth/user.entity';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(VehicleRepository)
    private vehicleRepository: VehicleRepository,
  ) {
  }

  async getVehicles(
    filterDto: GetVehiclesFilterDto,
    user: User,
  ): Promise<Vehicle[]> {
    return this.vehicleRepository.getVehicles(filterDto, user);
  }

  async getVehicleById(
    id: number,
    user: User,
  ): Promise<Vehicle> {
    const found = await this.vehicleRepository.findOne({ where: { id, userId: user.id } });

    if (!found) {
      throw new NotFoundException(`Vehicle with ID '${ id }' not found`);
    }

    return found;
  }

  async createVehicle(
    createVehicleDto: CreateVehicleDto,
    user: User,
  ): Promise<Vehicle> {
    return this.vehicleRepository.createVehicle(createVehicleDto, user);
  }

  async deleteVehicle(
    id: number,
    user: User,
  ): Promise<void> {
    const result = await this.vehicleRepository.delete({ id, userId: user.id });

    if (result.affected === 0) {
      throw new NotFoundException(`Vehicle with ID '${ id }' not found`);
    }
  }

  async updateVehicleStatus(
    id: number,
    status: VehicleStatus,
    user: User,
  ): Promise<Vehicle> {
    const vehicle = await this.getVehicleById(id, user);
    vehicle.status = status;
    await vehicle.save();
    return vehicle;
  }
}
