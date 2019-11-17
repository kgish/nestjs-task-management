import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { VehicleStatus } from './vehicle-status.enum';
import { User } from '../auth/user.entity';

@Entity()
export class Vehicle extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  status: VehicleStatus;

  @ManyToOne(type => User, user => user.vehicles, { eager: false })
  user: User;

  @Column()
  userId: number;
}
