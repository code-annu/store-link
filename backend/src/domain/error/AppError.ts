import {ErrorType} from "./ErrorType";

export class AppError extends Error {
    readonly errorType: ErrorType
    readonly statusCode: number

    constructor(message: string, errorType: ErrorType) {
        super(message);
        this.errorType = errorType;
        this.statusCode = errorType.valueOf()
    }
}