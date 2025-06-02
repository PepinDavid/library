import { BookSchema } from "./book.schema";
import { AuthorSchema } from "./author.schema";
import { BorrowedBookSchema } from "./borrowedBook.schema";
import { GenreSchema } from "./genre.schema";
import { UserSchema } from "./user.schema";
import { AuthorBookSchema } from "./author-book.schema";
import { GenreBookSchema } from "./genre-book.schema";


export {
    BookSchema,
    AuthorSchema,
    BorrowedBookSchema,
    GenreSchema,
    UserSchema,
    AuthorBookSchema,
}

export const schemas = [
    BookSchema,
    AuthorSchema,
    BorrowedBookSchema,
    GenreSchema,
    UserSchema,
    AuthorBookSchema,
    GenreBookSchema,
];