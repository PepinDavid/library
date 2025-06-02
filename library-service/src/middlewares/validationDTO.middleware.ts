import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { ValidationError } from '../errors/validationError';

export function validationDTOMiddleware<T extends {}>(dtoClass?: new () => T): (req: Request, res: Response, next: NextFunction) => void {
    return async (req, _, next) => {
        if (!Object.keys(req.body).length) {
            throw new ValidationError(
                `Validation failed: empty body`
            );
        }

        if (!dtoClass) {
            throw new ValidationError(
                `Validation failed: empty data`
            );
        }

        const dtoInstance = Object.assign(new dtoClass(), req.body);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            throw new ValidationError(
                `Validation failed: ${errors.map((e) => Object.values(e.constraints || {}).join(", ")).join("; ")}`
            );
        }

        next();
    };
}
