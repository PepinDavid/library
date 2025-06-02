import { FindOptions } from "sequelize";
import { IGenreBook } from "../models/genre-book.models";
import { GenreBookSchema } from "../schemas/genre-book.schema";
import { BaseService } from "./base.service";
import { InternalServerError } from "../errors/internalServerError";
import { BookSchema } from "../schemas";

export class GenreBookService extends BaseService<GenreBookSchema, IGenreBook> {
    constructor(model: typeof GenreBookSchema) {
        super(model);
    }

    override async getAll(options?: FindOptions): Promise<GenreBookSchema[] | null> {
            try {
                const genreBooks =  await this.model.findAll({
                    ...options,
                    include: [
                        { model: GenreBookSchema },
                        { model: BookSchema },
                    ],
                }) as GenreBookSchema[];
    
                return genreBooks;
            } catch (error) {
                throw new InternalServerError(error);
            }
        }
    
        override async getOne(id: number, options?: FindOptions): Promise<GenreBookSchema | null> {
            try {
                const genreBook =  await this.model.findByPk(id, {
                    ...options,
                    include: [
                        { model: GenreBookSchema },
                        { model: BookSchema },
                    ],
                }) as GenreBookSchema;
    
                return genreBook;
            } catch (error) {
                throw new InternalServerError(error);
            }
        }
}