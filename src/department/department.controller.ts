import { Controller, Post, Body, Res, Delete, Patch } from '@nestjs/common';
import { Department } from './department.entity';
import { Get, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CreateDepartmentDto } from './dto/create-department.dto';
import { UpdateDepartmentDto } from './dto/update-department.dto';
import { Response } from 'express';

@Controller('department')
export class DepartmentController {
  constructor(private departmentService: DepartmentService) {}

  @Get()
  getAllDepartments(): Promise<Department[] | null> | null {
    return this.departmentService.gellAllDepartments();
  }

  @Post('/create')
  createDepartment(
    @Body() createDepartmentDto: CreateDepartmentDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.departmentService.createDepartment(createDepartmentDto, res);
  }

  @Delete('/:id')
  deleteDepartment(@Body() id: string, @Res() res: Response): Promise<void> {
    return this.departmentService.deleteDepartment(id, res);
  }

  @Patch('/:id')
  updateDepartment(
    @Body() updateDepartmentDto: UpdateDepartmentDto,
    @Res() res: Response,
  ): Promise<void> {
    return this.departmentService.updateDepartment(updateDepartmentDto, res);
  }
}
