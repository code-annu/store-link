import {AppError} from "./AppError";
import {ErrorType} from "./ErrorType";

export class BadRequestError extends AppError {
    constructor(message: string) {
        super(message, ErrorType.BAD_REQUEST_ERROR);
    }
}
