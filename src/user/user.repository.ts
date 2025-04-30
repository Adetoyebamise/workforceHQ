import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCredentialsDto } from '../auth/dto/auth-credentials.dto';
import { AppError } from '../errors/appError';
import { ECONFLICT, ErrorUserExists, descriptions } from '../errors/index';
import * as bcrypt from 'bcrypt';
import { HttpException } from '@nestjs/common';
import { Department } from 'src/department/department.entity';

export class UserRepository {
  private userRepository: Repository<User>;
  private departmentRepository: Repository<Department>;

  constructor(private readonly datasource: DataSource) {
    this.userRepository = this.datasource.getRepository(User);
  }

  async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    try {
      const { name, password } = authCredentialsDto;
      const salt = await bcrypt.genSalt();
      const hashedPassword = await bcrypt.hash(password, salt);

      const user = this.userRepository.create({
        name,
        password: hashedPassword,
      });

      await this.userRepository.save(user);
    } catch (err) {
      if (err && err.code === '23505') {
        throw new AppError({
          errorType: ECONFLICT,
          appErrorCode: ErrorUserExists,
          error: descriptions.ErrorUserExists,
        });
      }
      if (err.code === '3992') {
        throw new HttpException('Custom error message', 3992);
      }
    }
  }

  async findOneByUserId(userId: string): Promise<User | null> {
    return await this.userRepository.findOne({
      where: { id: userId },
      relations: ['currency'],
      // select: ['id', 'balance'],
    });
  }

  async findOneByName(name: string): Promise<User | null> {
    return await this.userRepository.findOne({ where: { name } });
  }

  async save(user: User): Promise<User> {
    return await this.userRepository.save(user);
  }
}
