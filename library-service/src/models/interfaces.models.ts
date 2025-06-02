import { IsDate, IsInt } from "class-validator";
import { Column, DataType, Model } from "sequelize-typescript";

export interface IBaseModel {
    id?: number;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export abstract class BaseModel implements IBaseModel {
    @IsInt()
    id?: number;
    
    @IsDate()
    createdAt?: Date;

    @IsDate()
    updatedAt?: Date;

    @IsDate()
    deletedAt?: Date;
}

export abstract class ModelSQL extends Model implements IBaseModel {
    @Column({
        type: DataType.DATE,
        field: "created_at"
    })
    createdAt?: Date;

    @Column({
        type: DataType.DATE,
        field: "updated_at"
    })
    updatedAt?: Date;

    @Column({
        type: DataType.DATE,
        field: "deleted_at"
    })
    deletedAt?: Date;
}