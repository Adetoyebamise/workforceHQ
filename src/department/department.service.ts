import { Inject, Injectable } from '@nestjs/common';
import { Department } from './department.entity';
import { DepartmentRepository } from './department.repository';
import { UserRepository } from '../user/user.repository';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Response } from 'express';
import { USER_REPOSITORY } from 'src/user/user.constant';
import { AppError } from 'src/errors/appError';
import { descriptions, EINVALID } from 'src/errors';

@Injectable()
export class DepartmentService {
  constructor(
    private readonly departmentRepository: DepartmentRepository,
    @Inject(USER_REPOSITORY)
    private readonly userRepository: UserRepository,
  ) {}

  async gellAllDepartments(): Promise<Department[] | null> {
    return this.departmentRepository.findAll();
  }

  async createDepartment(
    createDepartmentDto: CreateDepartmentDto,
    res: Response,
  ): Promise<void> {
    const department =
      await this.departmentRepository.create(createDepartmentDto);
    console.log('user in service', department);
    res.status(201).json({
      status: 'success',
      message: 'User Registration successful',
      data: department,
    });
  }

  async updateDepartment(
    updateDepartmentDto: UpdateDepartmentDto,
    res: Response,
  ): Promise<void> {
    const updatedDepartment =
      await this.departmentRepository.create(updateDepartmentDto);
    console.log('updatedDepartment updatedDepartment', updatedDepartment);
    res.status(201).json({
      status: 'success',
      message: 'User Registration successful',
      data: updatedDepartment,
    });
  }

  async deleteDepartment(id: string, res: Response): Promise<void> {
    const department = await this.departmentRepository.findOneById(id);
    if (!department) {
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: '',
      });
    }
    await this.departmentRepository.deleteOneById(id);

    res.status(200).json({
      status: 'success',
      message: 'Department deleted successfully',
    });
  }
}
