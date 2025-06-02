import { IsNumber } from "class-validator";
import { BaseModel } from "./interfaces.models";

export interface IAuthorBooks {
    id?: number
    authorId: number;
    bookId: number;
}

export class AuthorBook extends BaseModel implements IAuthorBooks {
    @IsNumber()
    authorId!: number;

    @IsNumber()
    bookId!: number;
}

export class CreateAuthorBookDTO implements IAuthorBooks {
    @IsNumber()
    authorId!: number;

    @IsNumber()
    bookId!: number;
}

export class UpdateAuthorBookDTO implements IAuthorBooks {
    @IsNumber()
    id!: number;

    @IsNumber()
    authorId!: number;

    @IsNumber()
    bookId!: number;
}
