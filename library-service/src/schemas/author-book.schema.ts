import { AutoIncrement, BelongsTo, Column, DataType, ForeignKey, Model, PrimaryKey, Table } from "sequelize-typescript";
import { IAuthorBooks } from "../models/author-book.models";
import { BookSchema } from "./book.schema";
import { AuthorSchema } from "./author.schema";

@Table({tableName: 'authorbooks', modelName: 'AuthorBooks', timestamps: false})
export class AuthorBookSchema extends Model implements IAuthorBooks {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @ForeignKey(() => AuthorSchema)
    @Column({
        type: DataType.INTEGER,
        field: 'author_id',
    })
    authorId!: number;

    @ForeignKey(() => BookSchema)
    @Column({
        type: DataType.INTEGER,
        field: 'book_id',
    })
    bookId!: number;

    @BelongsTo(() => BookSchema)
    books?: BookSchema;

    @BelongsTo(() => AuthorSchema)
    authors?: AuthorSchema;
}