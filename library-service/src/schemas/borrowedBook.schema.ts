import { AllowNull, AutoIncrement, BelongsTo, Column, DataType, Default, ForeignKey, PrimaryKey, Table } from "sequelize-typescript";
import { BookSchema } from "./book.schema";
import { UserSchema } from "./user.schema";
import { EStatusBorrowed, IBorrowedBook } from "../models";
import { ModelSQL } from "../models/interfaces.models";

@Table({tableName: 'borrowed_books', modelName: 'BorrowedBooks', timestamps: true})
export class BorrowedBookSchema extends ModelSQL implements IBorrowedBook {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column({
        type: DataType.DATE,
        field: 'borrow_date'
    })
    borrowDate!: Date;

    @AllowNull(true)
    @Column({
        type: DataType.DATE,
        field: 'return_date'
    })
    returnDate!: Date;

    @Default(EStatusBorrowed.BORROWED)
    @Column(DataType.STRING)
    status!: EStatusBorrowed;

    @ForeignKey(() => BookSchema)
    @Column({
        type: DataType.INTEGER,
        field: 'book_id',
    })
    bookId!: number;

    @ForeignKey(() => UserSchema)
    @Column({
        type: DataType.INTEGER,
        field: 'user_id',
    })
    userId!: number;

    @BelongsTo(() => BookSchema)
    book!: BookSchema;

    @BelongsTo(() => UserSchema)
    user!: UserSchema;
}