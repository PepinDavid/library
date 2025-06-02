import { AutoIncrement, BelongsToMany, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import { IGenre } from "../models";
import { BookSchema } from "./book.schema";
import { GenreBookSchema } from "./genre-book.schema";
import { ModelSQL } from "../models/interfaces.models";

@Table({tableName: 'genres', modelName: 'Genres', timestamps: true})
export class GenreSchema extends ModelSQL implements IGenre {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    title!: string;

    @Column(DataType.STRING)
    descript!: string;

    @BelongsToMany(() => BookSchema, () => GenreBookSchema)
    books?: BookSchema[];
}
