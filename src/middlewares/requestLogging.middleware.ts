import { Injectable, NestMiddleware } from "@nestjs/common";
import type { Request, Response } from "express";

@Injectable()
export class RequestLoggingMiddleware implements NestMiddleware {

    use(req: Request, res: Response, next: (error?: any) => void) {

        // const data = {
        //     date: Date.now(),
        //     name: req.statusMessage,
        //     code: req.statusCode,
        //     path: req.url
        // }
        // console.log(data)
        // next();
    }

}