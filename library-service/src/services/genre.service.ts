import { IGenre } from "../models";
import { GenreSchema } from "../schemas";
import { BaseService } from "./base.service";

export class GenreService extends BaseService<GenreSchema, IGenre> {
    constructor(model: typeof GenreSchema) {
        super(model);
    }
}