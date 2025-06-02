import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { BaseModel, IBaseModel } from "./interfaces.models";

export interface IGenre extends IBaseModel {
    title: string;
    descript: string;
}

export class Genre extends BaseModel implements IGenre {
    @IsString()
    title!: string;

    @IsString()
    descript!: string;
}

export class CreateGenreDTO implements IGenre {
    @IsString()
    title!: string;

    @IsString()
    descript!: string;
}

export class UpdateGenreDTO implements IGenre {
    @IsInt()
    id?: number;

    @IsString()
    title!: string;

    @IsString()
    descript!: string;

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