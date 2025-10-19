import {Request, Response, NextFunction} from "express";
import {AppError} from "../../domain/error/AppError";

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
    if (error instanceof AppError) {
        return res.status(error.statusCode).json({error: error.message})
    }
    res.status(500).json({error: error.message})
}