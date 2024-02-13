import { Body, Controller, Get, Ip, Post, Query, Req, UseGuards } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { GeoCodesDto, CityNamesDto } from './dto/weather.dto';
import { Request, query } from 'express';
import { CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { RequestLoggingMiddleware } from 'src/middlewares/requestLogging.middleware';
import type { CustomLoggerService } from 'src/logger/logger.module';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('weather')


// @Use(RequestLoggingMiddleware)
export class WeatherController {
    constructor(
        private readonly weatherService: WeatherService,
        // private readonly logger: CustomLoggerService,
    ) { }

    @Get('by-names')
    // @CacheKey('custom_key')
    // @CacheTTL(20)
    getInfoByNames(@Query() cityCountryName: CityNamesDto, @Req() req: Request) {
        console.log("cityname", cityCountryName);

        return this.weatherService.getInfoByNames(cityCountryName, req)
    }

    @Get('forecast')
    forecastData(@Query() query: GeoCodesDto) {
        return this.weatherService.forecastData(query);
    }

}


