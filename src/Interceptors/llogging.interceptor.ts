import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { Observable, map, tap } from "rxjs";

import * as fs from 'fs';
import * as path from 'path';


export class LoggingInteceptor implements NestInterceptor {
    // private readonly filePath: string = path.join(__dirname, '../../src/logs/success.json');


    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {


        const ctx = context.switchToHttp();
        const request: Request = ctx.getRequest<Request>();
        const response: Response = ctx.getResponse<Response>();

        const startTime = Date.now();
        console.log(response.statusCode);


        // return next.handle().pipe(tap(() => {
        //     const endTime = Date.now();
        //     const resTime = endTime - startTime;

        //     const data = {
        //         isError: false,
        //         data: request.body,
        //         method: request.method,
        //         path: request.path,
        //         code: response.statusCode,
        //         Time: `${resTime}ms`,
        //         date: new Date().toISOString()
        //     }
        //     this.writeSuccessLog(data);

        // }))

        return next.handle().pipe(

            map(data => {
                // console.log("data", data);

                const endTime = Date.now();
                const resTime = endTime - startTime;
                return {
                    data: data,
                    isError: false,
                    message: response.statusMessage,
                    statusCode: response.statusCode,
                    time: `${resTime}ms`,
                    date: new Date().toISOString()
                };
            }),
        );
    }




}