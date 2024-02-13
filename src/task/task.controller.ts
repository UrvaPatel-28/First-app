import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, UseInterceptors, Request } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guards';
import { User } from "src/db/entities/user.entity";
// import { Request } from 'express';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';



@Controller('task')

export class TaskController {
    constructor(private readonly taskService: TaskService) { }

    @Get()
    getTask() {
        return this.taskService.findAll()
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() createTaskDto: CreateTaskDto, @Req() req) {
        const userId = req.user.payload.id;

        return this.taskService.create(createTaskDto, userId);
    }


}






