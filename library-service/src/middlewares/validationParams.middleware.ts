import { NextFunction, Request, Response } from "express";
import { ParamsNotFound } from "../errors/paramsNotFound";

export function validationParamsMiddleware(request: Request, _: Response, next: NextFunction): void {
    const { id } = request.params;
    const body = request.body

    if (!id || isNaN(parseInt(id))) throw new ParamsNotFound('Params id not found');

    if (Object.keys(body).length) {
        if (body.id !== parseInt(id)) {
            throw new ParamsNotFound('Params id and id object is not the same');
        }
    }

    next();
}
