import { AutoIncrement, BelongsToMany, Column, DataType, Default, PrimaryKey, Table } from "sequelize-typescript";
import { AuthorSchema } from "./author.schema";
import { GenreSchema } from "./genre.schema";
import { IBook } from "../models";
import { AuthorBookSchema } from "./author-book.schema";
import { GenreBookSchema } from "./genre-book.schema";
import { ModelSQL } from "../models/interfaces.models";

@Table({tableName: 'books', modelName: 'Books', timestamps: true})
export class BookSchema extends ModelSQL implements IBook {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    title!: string;

    @Column({
        type: DataType.INTEGER,
        field: 'published_year'
    })
    publishedYear!: number;

    @Default(0)
    @Column({
        type: DataType.INTEGER,
        field: 'copies_available'
    })
    copiesAvailable!: number;

    @BelongsToMany(() => GenreSchema, () => GenreBookSchema)
    genres?: GenreSchema[];

    @BelongsToMany(() => AuthorSchema, () => AuthorBookSchema)
    authors?: AuthorSchema[];
}
