import { Table, Column, DataType, Unique, AutoIncrement, PrimaryKey } from "sequelize-typescript";
import { ERole, IUser } from "../models";
import { ModelSQL } from "../models/interfaces.models";

@Table({tableName: 'users', modelName: 'Users', timestamps: true})
export class UserSchema extends ModelSQL implements IUser {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING)
    username!: string;
    
    @Unique(true)
    @Column(DataType.STRING)
    email!: string;
    
    @Column(DataType.STRING)
    password!: string;
    
    @Column(DataType.STRING)
    role!: ERole;
}
