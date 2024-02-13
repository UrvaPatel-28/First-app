import { Injectable, Module } from "@nestjs/common";


@Injectable()
export class CustomLoggerService {
    test() {
        console.log("TESTING")
    }
}

// @Module({
//     providers: [LoggerService],
//     exports: [LoggerService]
// })
// export class LoggerModule { }

