import { Module } from '@nestjs/common';
import { DepartmentController } from './department.controller';
import { DepartmentService } from './department.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './department.entity';
import { User } from '../user/user.entity';
import { DataSource } from 'typeorm';
import { DepartmentRepository } from './department.repository';
import { UserRepository } from '../user/user.repository';
import { USER_REPOSITORY } from '../user/user.constant';

@Module({
  imports: [TypeOrmModule.forFeature([Department, User])],
  providers: [
    DepartmentService,
    {
      provide: DepartmentRepository,
      useFactory: (dataSource: DataSource) => {
        return new DepartmentRepository(dataSource);
      },
      inject: [DataSource],
    },
    {
      provide: USER_REPOSITORY,
      useFactory: (dataSource: DataSource) => {
        return new UserRepository(dataSource);
      },
      inject: [DataSource],
    },
  ],
  exports: [DepartmentRepository, USER_REPOSITORY],
  controllers: [DepartmentController],
})
export class DepartmentModule {}
