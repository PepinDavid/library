import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { config } from '../config/config';
import { EHTTPStatus } from '../interfaces/controller.interface';

export function authenticateTokenMiddleware(req: Request & { user?: { id: string; email: string, role: string } }, res: Response, next: NextFunction): void {
    const authorizations = req.headers['authorization']?.split(' ');

    if (!authorizations) {
        res.status(EHTTPStatus.NO_AUTHENTICATED).send({ message: 'Access token is missing or invalid' });
        return;
    }

    try {
        const [_, token] = authorizations;
        const decoded = jwt.verify(token, config.jwt.secret) as { id: string; email: string; role: string };

        req.user = {
            id: decoded.id,
            email: decoded.email,
            role: decoded.role,
        };
        
        next();
    } catch (error) {
        res.status(EHTTPStatus.NO_AUTHENTICATED).json({ message: 'Invalid token' });
    }
}
