import {ErrorType} from "./ErrorType";
import {AppError} from "./AppError";

export class NotFoundError extends AppError {
    constructor(message: string) {
        super(message, ErrorType.NOT_FOUND_ERROR);
    }
}