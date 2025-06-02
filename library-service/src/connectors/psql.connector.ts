import { Sequelize } from "sequelize-typescript";
import { schemas } from "../schemas";
import { config } from "../config/config";

let sequelize: Sequelize;

if (process.env.TARGET === 'docker') {
    sequelize = new Sequelize({
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        dialect: 'postgres',
        models: schemas,
    });
} else {
    sequelize = new Sequelize({
        host: config.database.host,
        port: config.database.port,
        username: config.database.username,
        password: config.database.password,
        database: config.database.database,
        dialect: 'sqlite',
        storage: process.env.DB_STORAGE,
        models: schemas,
    });
}


export { sequelize }
