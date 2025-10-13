import { ErrorType } from "./error-type";

export class CustomError extends Error {
  errorType: ErrorType;

  constructor(message: string, errorType: ErrorType) {
    super(message);
    this.errorType = errorType;
  }

  static BadRequestError(): CustomError {
    return new CustomError("Request cannot proceed", ErrorType.BAD_REQUEST);
  }
}