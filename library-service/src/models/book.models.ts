import { IsDate, IsInt, IsOptional, IsString, Min } from "class-validator";
import { BaseModel, IBaseModel } from "./interfaces.models";

export interface IBook extends IBaseModel{
    title: string;
    publishedYear: number;
    copiesAvailable: number;
}

export class Book extends BaseModel implements IBook {
    @IsString()
    title!: string;

    @IsInt()
    publishedYear!: number;
    
    @IsInt()
    @Min(0)
    copiesAvailable!: number;
}

export class CreateBookDTO implements IBook {
    @IsString()
    title!: string;

    @IsInt()
    publishedYear!: number;
    
    @IsInt()
    @Min(0)
    copiesAvailable!: number;
}

export class UpdateBookDTO implements IBook {
    @IsInt()
    id?: number;

    @IsString()
    title!: string;

    @IsInt()
    publishedYear!: number;
    
    @IsInt()
    @Min(0)
    copiesAvailable!: number;

    @IsOptional()
    @IsDate()
    createdAt?: Date;

    @IsOptional()
    @IsDate()
    updatedAt?: Date;

    @IsOptional()
    @IsDate()
    deletedAt?: Date;
}
