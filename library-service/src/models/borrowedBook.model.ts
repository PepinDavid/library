import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { BaseModel, IBaseModel } from "./interfaces.models";

export enum EStatusBorrowed {
    BORROWED = "BORROWED",
    RETURNED = "RETURNED", 
};

export interface IBorrowedBook extends IBaseModel {
    bookId?: number;
    userId?: number;
    borrowDate: Date;
    returnDate: Date;
    status: EStatusBorrowed;
}

export class BorrowedBook extends BaseModel implements IBorrowedBook {
    @IsInt()
    bookId?: number

    @IsInt()
    userId?: number

    @IsDate()
    borrowDate!: Date

    @IsDate()
    returnDate!: Date

    @IsString()
    status!: EStatusBorrowed
}

export class CreateBorrowedBookDTO {
    @IsInt()
    bookId?: number;

    @IsInt()
    userId?: number;

    @IsDate()
    borrowDate!: Date;

    @IsString()
    status!: EStatusBorrowed;
}

export class UpdateBorrowedBookDTO {
    @IsInt()
    id?: number;

    @IsInt()
    bookId?: number;

    @IsInt()
    userId?: number;

    @IsDate()
    borrowDate!: Date;

    @IsOptional()
    @IsDate()
    returnDate!: Date;

    @IsString()
    status!: EStatusBorrowed;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;
}