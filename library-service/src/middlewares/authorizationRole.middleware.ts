import { NextFunction, Response, Request } from "express";
import { ERole } from "../models";
import { ForbiddenError } from "../errors/forbiddenError";
import { RequestWithUser } from "../interfaces/express.interface";

export function authorizationRoleMiddleware(request: Request, _: Response, next: NextFunction): void {
    const user = (request as RequestWithUser).user;

    if (user?.role !== ERole.ADMIN) {
        throw new ForbiddenError('Not Authorized');
    }

    next();
}
