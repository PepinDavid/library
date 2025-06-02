import { IsDate, IsInt, IsOptional, IsString } from "class-validator";
import { BaseModel, IBaseModel } from "./interfaces.models";

export enum ERole {
    READER = "READER",
    ADMIN = "ADMIN",
}

export interface IUser extends IBaseModel {
    username: string;
    email: string;
    password: string;
    role: ERole;
}

export class User extends BaseModel implements IUser {
    @IsString()
    username!: string;

    @IsString()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    role!: ERole;
}

export class CreateUserDTO implements IUser {
    @IsString()
    username!: string;

    @IsString()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    role!: ERole;
}

export class UpdateUserDTO implements IUser {
    @IsInt()
    id?: number;

    @IsString()
    username!: string;

    @IsString()
    email!: string;

    @IsString()
    password!: string;

    @IsString()
    role!: ERole;
    
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