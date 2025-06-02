import { IsNumber } from "class-validator";
import { BaseModel } from "./interfaces.models";

export interface IGenreBook {
    id?: number;
    genreId?: number;
    bookId?: number
}

export class GenreBook extends BaseModel implements IGenreBook {
    @IsNumber()
    genreId!: number;

    @IsNumber()
    bookId!: number;
}

export class CreateGenreBookDTO implements IGenreBook {
    @IsNumber()
    genreId!: number;

    @IsNumber()
    bookId!: number;
}

export class UpdateGenreBookDTO implements IGenreBook {
    @IsNumber()
    id!: number;

    @IsNumber()
    genreId!: number;

    @IsNumber()
    bookId!: number;
}
