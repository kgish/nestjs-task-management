import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { VehiclesModule } from './vehicles/vehicles.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(typeOrmConfig),
        TasksModule,
        VehiclesModule,
        AuthModule,
    ],
    controllers: [],
})
export class AppModule {
}
