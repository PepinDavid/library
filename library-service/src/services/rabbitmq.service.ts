
import { IMessageBroker } from "../interfaces/service.interface";
import { Channel } from "amqplib";


export class RabbitMQService implements IMessageBroker {
  constructor(private readonly channel: Channel) {
  }

  public async publish<T extends object>(exchange: string, routingKey: string, message: T): Promise<void> {
    await this.channel.assertExchange(exchange, 'topic', { durable: true });

    const payload = Buffer.from(JSON.stringify(message));
    const sent = this.channel.publish(exchange, routingKey, payload, { persistent: true });

    if (sent) {
      console.log(`Message sent to exchange "${exchange}"`);
    } else {
      console.warn(`Failed to send message to exchange "${exchange}"`);
    }
  }

  public async consume(
    queue: string,
    exchange: string,
    routingKey: string,
    handler: (msg: unknown) => void,
    exchangeType: 'topic' | 'direct' | 'fanout' = 'topic',
  ): Promise<void> {
    await this.channel.assertExchange(exchange, exchangeType, { durable: true });
    await this.channel.assertQueue(queue, { durable: true });
    await this.channel.bindQueue(queue, exchange, routingKey);

    this.channel.consume(queue, (msg) => {
      if (msg) {
        try {
          const content = JSON.parse(msg.content.toString());
          handler(content);
          this.channel!.ack(msg);
        } catch (error) {
          console.error(`Error handling message from ${queue}:`, error);
          this.channel!.nack(msg, false, false); // discard message
        }
      }
    });
  }
}
