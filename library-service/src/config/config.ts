import dotenv from "dotenv";

if (process.env.TARGET !== 'docker') {
    dotenv.config();
}

export const config = {
    target: process.env.TARGET || 'dev',
    jwt: {
        secret: process.env.JWT_SECRET || 'default_secret',
        expiresIn: parseInt(process.env.JWT_EXPIRES_IN || '3600', 10),
    },
    database: {
        host: process.env.DB_HOST || 'localhost',
        port: parseInt(process.env.DB_PORT || '5432', 10),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'database',
    },
    server: {
        port: parseInt(process.env.SERVER_PORT || '3000', 10),
    },
    rabbitmq: {
        host: process.env.RABBITMQ_HOST || '',
        port: parseInt(process.env.RABBITMQ_PORT || '5672', 10),
        url: process.env.RABBITMQ_URL || '',
        user: process.env.RABBITMQ_USER || '',
        password: process.env.RABBITMQ_PASSWORD || '',
    },
};

console.log(config);