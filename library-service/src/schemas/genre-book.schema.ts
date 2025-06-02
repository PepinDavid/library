import { AutoIncrement, Column, DataType, ForeignKey, BelongsTo, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IGenreBook } from "../models/genre-book.models";
import { GenreSchema } from "./genre.schema";
import { BookSchema } from "./book.schema";

@Table({tableName: 'genrebook', modelName: 'GenreBook', timestamps: false})
export class GenreBookSchema extends Model implements IGenreBook {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => GenreSchema)
    @Column({
        type: DataType.INTEGER,
        field: 'genre_id',
    })
    genreId!: number;

    @ForeignKey(() => BookSchema)
    @Column({
        type: DataType.INTEGER,
        field: 'book_id',
    })
    bookId!: number;

    @BelongsTo(() => BookSchema)
    book?: BookSchema;

    @BelongsTo(() => GenreSchema)
    genre?: GenreSchema;
}