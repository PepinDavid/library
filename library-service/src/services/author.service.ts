import { IAuthor } from "../models";
import { AuthorSchema } from "../schemas";
import { BaseService } from "./base.service";

export class AuthorService extends BaseService<AuthorSchema, IAuthor> {
    constructor(model: typeof AuthorSchema) {
        super(model);
    }
}