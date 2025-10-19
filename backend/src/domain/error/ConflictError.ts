import {ErrorType} from "./ErrorType";
import {AppError} from "./AppError";

export class ConflictError extends AppError {
    constructor(message: string) {
        super(message, ErrorType.CONFLICT_ERROR);
    }
}