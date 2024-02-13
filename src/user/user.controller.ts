import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, Req, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { RoleGuard } from 'src/guards/role.guards';
import { UserRole } from './roles.enum';
import { User } from "src/db/entities/user.entity";
import { Request } from 'express';



@Controller('user')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto): Promise<User> {

    return this.userService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto): Promise<User> {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }



  // authorization

  @Get('my')
  @UseGuards(AuthGuard('jwt'))
  my(@Req() req: Request): any {
    return req.user
  }


  @Get('manager')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(UserRole.MANAGER),)
  managerInfo(): string {
    return `This is manager's route `
  }

  @Get('admin')
  @UseGuards(AuthGuard('jwt'), new RoleGuard(UserRole.ADMIN))
  adminInfo(): string {
    return `This is admin's route`
  }



  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(id);
  // }



}






