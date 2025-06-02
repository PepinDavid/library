import { AutoIncrement, BelongsToMany, Column, DataType, PrimaryKey, Table } from "sequelize-typescript";
import { IAuthor } from "../models";
import { BookSchema } from "./book.schema";
import { AuthorBookSchema } from "./author-book.schema";
import { ModelSQL } from "../models/interfaces.models";

@Table({tableName: 'authors', modelName: 'Authors', timestamps: true})
export class AuthorSchema extends ModelSQL implements IAuthor {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    lastname!: string;

    @Column(DataType.STRING)
    firstname!: string;

    @BelongsToMany(() => BookSchema, () => AuthorBookSchema)
    books?: BookSchema;
}