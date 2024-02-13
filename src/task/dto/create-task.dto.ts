import { IsAlphanumeric, IsEmail, IsEnum, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, Matches, MinLength } from "class-validator";

export class CreateTaskDto {

    @IsString()
    @MinLength(3, { message: 'Title must have atleast 3 characters.' })
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;



    //


}
