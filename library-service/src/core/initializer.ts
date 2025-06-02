import * as http from "http";
import { Application } from "express";
import { registerController, registerServices } from "./register";
import { HttpError } from "http-errors";
import { config } from "../config/config";
import { errorHandlerMiddleware } from "../middlewares/errorsHandler.middleware";
import { sequelize } from "../connectors/psql.connector";
import { rabbitMQCoonector } from "../connectors/rabbitmq.connector";

export async function initializerConnector(): Promise<void> {
    console.log('Initialization DB connector');

    await startConnectionDatabase();
    await startConnectionRabbitMQ();
}

export function intializerRegistries(): void {
    registerServices();
    registerController();
}

export async function startServer(app: Application) {
    app.use(errorHandlerMiddleware);
    console.log('process start server');
    const port: number = Number(config.server.port);
    const server = http.createServer(app);

    server.listen(port);
    server.on('error', onError);
    server.on('listening', onListening);

    function onListening() {
        console.log(`Listening on ${port}`);
    }
    
    function onError(error: HttpError) {
        if (error.syscall !== 'listen') {
            throw error;
        }
      
        switch (error.code) {
            case 'EACCES':
                console.error(port + ' requires elevated privileges');
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(port + ' is already in use');
                process.exit(1);
                break;
            default:
                throw error;
        }
    }
}

export async function startConnectionDatabase() {
    try {
        await sequelize.authenticate();
        console.log(`Connection to the database: ${config.database.database} established successfully`);

        await sequelize.sync({ force: false });
        console.log('Database synchronized.');
        
    } catch (error) {
        console.error('Unable to connect to the database', error);
    }
}

export async function startConnectionRabbitMQ() {
    await rabbitMQCoonector.init();
}