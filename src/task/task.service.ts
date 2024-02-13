import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/db/entities/user.entity";
import { Repository } from "typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "src/db/entities/task.entity";
import { BadRequestException } from "@nestjs/common";
import { UserService } from "src/user/user.service";

export class TaskService {



    constructor(@InjectRepository(Task) private readonly taskRepository: Repository<Task>, private readonly userService: UserService,) { }
    getTaks() {

    }

    async create(createTaskDto: CreateTaskDto, userId) {
        console.log(userId);

        const user = await this.userService.findById(userId);
        console.log(user);

        const task = this.taskRepository.create({ ...createTaskDto, user: user });
        return await this.taskRepository.save(task)
    }

    async findAll() {
        try {
            return await this.taskRepository.find({ relations: { user: true } });
        } catch (error) {
            throw new BadRequestException()
        }
    }

}