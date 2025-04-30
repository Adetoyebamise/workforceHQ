import { DataSource, Repository } from 'typeorm';
import { Department } from './department.entity';
import { EINVALID } from 'src/errors';
import { AppError } from 'src/errors/appError';

export class DepartmentRepository {
  private DepartmentRepository: Repository<Department>;

  constructor(private readonly datasource: DataSource) {
    this.DepartmentRepository = this.datasource.getRepository(Department);
  }

  async create(DepartmentData: Partial<Department>): Promise<Department> {
    return await this.DepartmentRepository.create(DepartmentData);
  }

  async save(department: Department): Promise<Department> {
    return await this.DepartmentRepository.save(department);
  }

  async findOneByUserId(userId: string): Promise<Department | null> {
    return await this.DepartmentRepository.createQueryBuilder('department')
      .leftJoin('department.users', 'user')
      .where('user.id = :userId', { userId })
      .getOne();
  }

  async deleteOneById(id: string): Promise<Department | null> {
    const department = await this.DepartmentRepository.findOne({
      where: { id: id },
    });
    if (!department)
      throw new AppError({
        errorType: EINVALID,
        appErrorCode: '',
        error: '',
      });

    await this.DepartmentRepository.createQueryBuilder()
      .delete()
      .from(Department)
      .where('id = :id', { id: id })
      .execute();

    return department;
  }

  async findOneById(id: string): Promise<Department | null> {
    return await this.DepartmentRepository.findOne({
      where: { id: id },
    });
  }

  async updateOneById(query: {
    id: string;
    name?: string | undefined;
    subDepartments?: any;
  }): Promise<Department | null> {
    const updateValues: Department = {
      id: query.id,
      name: query.name,
      subDepartments: query.subDepartments!,
      users: [],
    };
    const record = await this.DepartmentRepository.createQueryBuilder()
      .update()
      .set({ ...updateValues })
      .where('id = :id', { id: query.id })
      .returning('*')
      .execute()
      .then((result) => result.raw[0]);

    return await this.DepartmentRepository.save(record);
  }

  async findAll(): Promise<Department[]> {
    return await this.DepartmentRepository.find();
  }
}
