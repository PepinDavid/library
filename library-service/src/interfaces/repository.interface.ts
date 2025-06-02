import { FindOptions } from "sequelize";

export interface IRepository<T> {
    findAll(options?: FindOptions): Promise<T[]>;
    findById(id: number | string): Promise<T | null>;
    create(data: Partial<T>): Promise<T>;
    update(id: number | string, data: Partial<T>): Promise<number>;
    delete(id: number | string): Promise<number>;
}