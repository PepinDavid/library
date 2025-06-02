import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';


export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password } = req.body;

            if (!email || !password) {
                res.status(400).json({ message: 'Email and password are required' });
                return;
            }

            const token = await this.authService.login(email, password);

            res.status(200).json({ token });
        } catch (error) {
            console.log(error)
            next(error);
        }
    }
}
