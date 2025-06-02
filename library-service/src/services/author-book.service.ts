import { FindOptions } from "sequelize";
import { IAuthorBooks } from "../models/author-book.models";
import { AuthorBookSchema, AuthorSchema, BookSchema } from "../schemas";
import { BaseService } from "./base.service";
import { InternalServerError } from "../errors/internalServerError";

export class AuthorBookService extends BaseService<AuthorBookSchema, IAuthorBooks> {
    constructor(model: typeof AuthorBookSchema) {
        super(model);
    }

    override async getAll(options?: FindOptions): Promise<AuthorBookSchema[] | null> {
        try {
            const authorBooks =  await this.model.findAll({
                ...options,
                include: [
                    { model: AuthorSchema },
                    { model: BookSchema },
                ],
            }) as AuthorBookSchema[];

            return authorBooks;
        } catch (error) {
            throw new InternalServerError(error);
        }
    }

    override async getOne(id: number, options?: FindOptions): Promise<AuthorBookSchema | null> {
        try {
            const authorBook =  await this.model.findByPk(id, {
                ...options,
                include: [
                    { model: AuthorSchema },
                    { model: BookSchema },
                ],
            }) as AuthorBookSchema;

            return authorBook;
        } catch (error) {
            throw new InternalServerError(error);
        }
    }
}
