import { Optional } from "@nestjs/common";
import { IsDate, IsIn, IsInt, IsLatitude, IsLongitude, IsNotEmpty, IsNumber, IsString, MinLength } from "class-validator";


export class CityNamesDto {

    @IsString()
    @MinLength(2, { message: 'City must have atleast 2 characters.' })
    @IsNotEmpty()
    city: string;


    country: string;



    //


}

export class GeoCodesDto {
    @IsLatitude()
    latitude: number

    @IsLongitude()
    longitude: number

    @IsDate()
    date: Date
}
