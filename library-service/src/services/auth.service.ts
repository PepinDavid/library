import jwt from "jsonwebtoken";
import { UserSchema } from '../schemas';
import { UnauthorizedError } from '../errors/unauthorizedError';
import { InternalServerError } from "../errors/internalServerError";
import { verifyPassword } from "../utils/tools";

export class AuthService {
    private readonly jwtSecret: string;
    private readonly jwtExpiresIn: number;

    constructor(jwtSecret: string, jwtExpiresIn: number = 3600, private readonly model: typeof UserSchema) {
        this.jwtSecret = jwtSecret;
        this.jwtExpiresIn = jwtExpiresIn;
    }

    async login(email: string, password: string): Promise<string> {
        try {
            const user = await this.model.findOne({ where: { email } });

            if (!user || !(await verifyPassword(user.password, password))) {
                throw new UnauthorizedError('Invalid email or password');
            }

            const payload = { id: user.id, email: user.email, name: user.username, role: user.role };
            
            return jwt.sign(payload, this.jwtSecret, { expiresIn: this.jwtExpiresIn });
        } catch (error) {
            throw new InternalServerError(error);
        }
    }
}
