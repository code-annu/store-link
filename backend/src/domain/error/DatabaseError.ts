import {ErrorType} from "./ErrorType";
import {AppError} from "./AppError";

export class DatabaseError extends AppError {
    constructor(message: string) {
        super(message, ErrorType.INTERNAL_SERVER_ERROR);
    }
}