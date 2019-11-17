import { Test } from '@nestjs/testing';
import { VehiclesService } from './vehicles.service';
import { VehicleRepository } from './vehicle.repository';
import { GetVehiclesFilterDto } from './dto/get-vehicles-filter.dto';
import { VehicleStatus } from './vehicle-status.enum';
import { NotFoundException } from '@nestjs/common';

describe('VehicleService', () => {
    let tasksService;
    let taskRepository;

    const mockUser = { id: 12, username: 'Test user' };

    const mockVehicleRepository = () => ({
        getVehicles: jest.fn(),
        findOne: jest.fn(),
        createVehicle: jest.fn(),
        delete: jest.fn(),
    });

    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [
                VehiclesService,
                { provide: VehicleRepository, useFactory: mockVehicleRepository },
            ],
        }).compile();

        tasksService = await module.get<VehiclesService>(VehiclesService);
        taskRepository = await module.get<VehicleRepository>(VehicleRepository);
    });

    describe('getVehicles', () => {
        it('gets all tasks from repository', async () => {
            taskRepository.getVehicles.mockResolvedValue('someValue');

            expect(taskRepository.getVehicles).not.toHaveBeenCalled();

            const filters: GetVehiclesFilterDto = { status: VehicleStatus.READY, search: 'Something to search' };
            const result = await tasksService.getVehicles(filters, mockUser);
            tasksService.getVehicles(filters, mockUser);
            expect(taskRepository.getVehicles).toHaveBeenCalled();
            expect(result).toEqual('someValue');
        });
    });

    describe('getVehiclesById', () => {
        it('calls taskRepository.findOne() and successfully retrieve and return the task', async () => {
            const mockVehicle = { title: 'Test task', description: 'Vehicle description' };
            taskRepository.findOne.mockResolvedValue(mockVehicle);

            const result = await tasksService.getVehicleById(1, mockUser);
            expect(result).toEqual(mockVehicle);

            expect(taskRepository.findOne).toHaveBeenCalledWith({ where: { id: 1, userId: mockUser.id } });

        });

        it('throws as error if task not found', () => {
            taskRepository.findOne.mockResolvedValue(null);
            expect(tasksService.getVehicleById(1, mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('createVehicle', () => {

        it('calls taskRepository.createVehicle() and returns the result', async () => {
            const createVehicleDTO = { title: 'Vehicle title', description: 'Vehicle description' };
            taskRepository.createVehicle.mockResolvedValue('someValue');
            expect(taskRepository.createVehicle).not.toHaveBeenCalled();
            const result = await tasksService.createVehicle(createVehicleDTO, mockUser);
            expect(taskRepository.createVehicle).toHaveBeenCalledWith(createVehicleDTO, mockUser);
            expect(result).toEqual('someValue');
        });
    });

    describe('deleteVehicle', () => {

        it('calls taskRepository.deleteVehicle() and returns the result', async () => {
            taskRepository.delete.mockResolvedValue({ affected: 1 });
            expect(taskRepository.delete).not.toHaveBeenCalled();
            await tasksService.deleteVehicle(1, mockUser);
            expect(taskRepository.delete).toHaveBeenCalledWith({ id: 1, userId: mockUser.id });
        });

        it('throws as error if task not found', () => {
            taskRepository.delete.mockResolvedValue({ affected: 0 });
            expect(tasksService.deleteVehicle(1, mockUser)).rejects.toThrow(NotFoundException);
        });
    });

    describe('updateVehicleStatus', () => {

        it('updates task status', async () => {
            const save = jest.fn().mockResolvedValue(true);

            tasksService.getVehicleById = jest.fn().mockResolvedValue({
                status: VehicleStatus.READY,
                save,
            });

            expect(tasksService.getVehicleById).not.toHaveBeenCalled();
            const result = await tasksService.updateVehicleStatus(1, VehicleStatus.PARKED);
            expect(tasksService.getVehicleById).toHaveBeenCalled();
            expect(save).toHaveBeenCalled();
            expect(result.status).toEqual(VehicleStatus.PARKED);
        });
    });
});
