import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  Unique,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity('leaverequests')
@Unique(['name'])
export class LeaveRequest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  leaveType: string;

  @Column({ nullable: false })
  startDate: string;

  @Column()
  endDate: string;

  @ManyToOne(() => User, (user) => user.leaverequset, {
    nullable: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => LeaveRequest, (leaverequest) => leaverequest.user)
  leaverequests: LeaveRequest[];

  @CreateDateColumn()
  createdAt?: Date;

  @UpdateDateColumn()
  updatedAt?: Date;
}
