import {ErrorType} from "./ErrorType";
import {AppError} from "./AppError";

export class UnauthorizedError extends AppError {
    constructor(message: string) {
        super(message, ErrorType.UNAUTHORIZED_ERROR);
    }
}