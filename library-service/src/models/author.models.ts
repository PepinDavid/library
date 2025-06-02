import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { IBaseModel } from "./interfaces.models";

export interface IAuthor extends IBaseModel {
    lastname: string;
    firstname: string;
}

export class Author implements IAuthor {
    @IsString()
    lastname!: string;

    @IsString()
    firstname!: string;
}

export class CreateAuthorDTO implements IAuthor {
    @IsString()
    lastname!: string;

    @IsString()
    firstname!: string;
}

export class UpdateAuthorDTO implements IAuthor {
    @IsInt()
    id?: number;

    @IsString()
    lastname!: string;

    @IsString()
    firstname!: string;

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