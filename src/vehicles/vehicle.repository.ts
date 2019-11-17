import { EntityRepository, Repository } from 'typeorm';
import { InternalServerErrorException, Logger } from '@nestjs/common';

import { Vehicle } from './vehicle.entity';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { VehicleStatus } from './vehicle-status.enum';
import { GetVehiclesFilterDto } from './dto/get-vehicles-filter.dto';
import { User } from '../auth/user.entity';

@EntityRepository(Vehicle)
export class VehicleRepository extends Repository<Vehicle> {
    private logger = new Logger('VehicleRepository');

    async getVehicles(
        filterDto: GetVehiclesFilterDto,
        user: User,
    ): Promise<Vehicle[]> {
        const { status, search } = filterDto;
        const query = this.createQueryBuilder('vehicle');

        query.where('vehicle.userId = :userId', { userId: user.id });

        if (status) {
            query.andWhere('vehicle.status = :status', { status });
        }

        if (search) {
            query.andWhere('(vehicle.title LIKE :search OR vehicle.description LIKE :search)', { search: `%${ search }%` });
        }

        try {
            const vehicles = await query.getMany();
            return vehicles;
        } catch (error) {
            this.logger.error(`Failed to get vehicles for user '${ user.username }'. Filters: ${ JSON.stringify(filterDto) }`, error.stack);
            throw new InternalServerErrorException();
        }
    }

    async createVehicle(
        createvehicleDto: CreateVehicleDto,
        user: User,
    ): Promise<Vehicle> {
        const { name, description } = createvehicleDto;

        const vehicle = new Vehicle();
        vehicle.name = name;
        vehicle.description = description;
        vehicle.status = VehicleStatus.READY;
        vehicle.user = user;
        try {
            await vehicle.save();
        } catch (error) {
            this.logger.error(`Failed to create vehicle for user '${ user.username }'. Data: ${ JSON.stringify(createvehicleDto) }`, error.stack);
            throw new InternalServerErrorException();
        }

        // Do not include the user object in the return data.
        delete vehicle.user;

        return vehicle;
    }
}
