import { IAuthor } from "./author.models";
import { IBook } from "./book.models";
import { IBorrowedBook, EStatusBorrowed } from "./borrowedBook.model";
import { IGenre } from "./genre.models";
import { IUser, ERole } from "./user.models";

export type ConstructorDTO = new () => {};

export {
    IAuthor,
    IBook,
    IBorrowedBook,
    IGenre,
    IUser,
    EStatusBorrowed,
    ERole,
}