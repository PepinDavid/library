import { IUser } from "../models";
import { UserSchema } from "../schemas";
import { hashPassword } from "../utils/tools";
import { BaseService } from "./base.service";

export class UserService extends BaseService<UserSchema, IUser> {
    constructor(model: typeof UserSchema) {
        super(model);
    }

    override async create(data: Partial<IUser>): Promise<UserSchema> {
        try {
            const password = data.password!;
            const cryptPassword = await hashPassword(password);

            return await UserSchema.create({...data, password: cryptPassword});
        } catch(error: unknown) {
            throw new Error(`Error create service ${error}`);
        }
    }
}