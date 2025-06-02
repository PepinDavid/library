import amqp, { Channel, ChannelModel } from "amqplib";
import { InternalServerError } from "../errors/internalServerError";
import { IRabbitMQOptions } from "../interfaces/rabbitmq-event.interface";
import { config } from "../config/config";

export class RabbitMQConnector {
    private connection!: ChannelModel;
    private channel!: Channel;

    constructor(private readonly options: IRabbitMQOptions | string) {
    }

    public async init() {
        try {
            if (typeof(this.options) === 'string') {
                this.connection = await amqp.connect(this.options);
            } else {
                this._checkOptions(this.options);
                this.connection = await amqp.connect(
                    `amqp://${this.options.username}:${this.options.password}@${this.options.host}:${this.options.port}`
                );
            }

            this.channel = await this.connection!.createChannel();
        } catch (error) {
            throw new InternalServerError(`No connection to RabbitMQ: ${error}`);
        }
    }

    public getConnection(): ChannelModel {
        if (!this.connection)
            throw new InternalServerError("No connection to RabbitMQ");

        return this.connection;
    }

    public getChannel(): Channel {
        if (!this.channel) {
          throw new InternalServerError('RabbitMQ channel is not initialized');
        }

        return this.channel;
    }

    private _checkOptions(options: IRabbitMQOptions): void {
        const required = ['host', 'port', 'username', 'password'];
        for (const key of required) {
            if (!options[key as keyof IRabbitMQOptions]) {
                throw new InternalServerError(`Missing RabbitMQ config key: ${key}`);
            }
        }
    }

    public async close() {
        await this.connection?.close();
    }
}

export const rabbitMQCoonector = new RabbitMQConnector(config.rabbitmq.url);