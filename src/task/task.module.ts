import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { Task } from 'src/db/entities/task.entity';
import { UserModule } from 'src/user/user.module';
import { CustomLoggerService } from 'src/logger/logger.module';

@Module({
    imports: [TypeOrmModule.forFeature([Task]), UserModule,],
    controllers: [TaskController],
    providers: [TaskService],
    exports: [TaskService]
})
export class TaskModule { }
