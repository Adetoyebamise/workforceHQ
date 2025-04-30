import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { DepartmentModule } from './department/department.module';
import { User } from './user/user.entity';
import { Department } from './department/department.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      entities: [User, Department],
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    DepartmentModule,
  ],
  providers: [AppService],
})
export class AppModule {}
