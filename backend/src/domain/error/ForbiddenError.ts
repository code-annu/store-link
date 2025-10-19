import {ErrorType} from "./ErrorType";
import {AppError} from "./AppError";

export class ForbiddenError extends AppError {
    constructor(message: string) {
        super(message, ErrorType.FORBIDDEN_ERROR);
    }
}