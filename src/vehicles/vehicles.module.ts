import { Module } from '@nestjs/common';
import { VehiclesController } from './vehicles.controller';
import { VehiclesService } from './vehicles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleRepository } from './vehicle.repository';
import { AuthModule } from '../auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([ VehicleRepository ]),
        AuthModule,
    ],
    controllers: [ VehiclesController ],
    providers: [ VehiclesService ],
})
export class VehiclesModule {
}
