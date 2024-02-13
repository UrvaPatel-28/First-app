import { BadGatewayException, BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from "src/db/entities/user.entity";
import { InjectRepository } from '@nestjs/typeorm';

import * as bcrypt from 'bcrypt'
import { UserRole } from './roles.enum';
import { title } from 'process';

@Injectable()
export class UserService {

  //inject user repo
  constructor(@InjectRepository(User) private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {

      const existingUser: User = await this.userRepository.findOneBy({ email: createUserDto.email });
      if (existingUser) {
        throw new BadRequestException();
      }

      const hashedPassword: string = await bcrypt.hash(createUserDto.password, 10);

      // Create a new user object with the hashed password
      const user = this.userRepository.create({
        ...createUserDto,
        password: hashedPassword,

      });

      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException()
    }

  }


  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find({ relations: { tasks: true } });
    } catch (error) {
      throw new BadRequestException()
    }
  }

  // findOne(id: string): Promise<User> {
  //   return this.userRepository.findOneBy({ id });
  // }


  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {

    try {
      const user = await this.userRepository.findOne({ where: { id: id } });
      if (user) {
        user.email = updateUserDto.email;
        user.password = updateUserDto.password;
        user.mobileNumber = updateUserDto.mobileNumber;
        user.userName = updateUserDto.userName
      } else {
        throw new NotFoundException();
      }

      // return "success"
      return this.userRepository.save(user);
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async remove(id: string) {
    try {
      return await this.userRepository.delete(id);
    } catch (error) {
      throw new BadRequestException()
    }
  }


  // //for authorization
  async findOne(email: string) {
    try {
      return await this.userRepository.findOneBy({ email });
    } catch (error) {
      throw new BadRequestException()
    }
  }

  async findById(id: string) {
    try {
      return await this.userRepository.findOneBy({ id });
    } catch (error) {
      throw new BadRequestException()
    }
  }
}
////