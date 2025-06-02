import { Injectable, OnModuleInit } from '@nestjs/common';
import * as amqp from 'amqplib';
import { Channel, ChannelModel } from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private connection!: ChannelModel;
  private channel!: Channel;

  async onModuleInit() {
    const url = process.env.RABBITMQ_URL;
    if (!url) throw new Error('RABBITMQ_URL is not defined');

    try {
      this.connection = await amqp.connect(url);
      this.channel = await this.connection.createChannel();
    } catch (error) {
      throw new Error(error as string);
    }
  }

  async getChannel(): Promise<Channel> {
    if (!this.channel) {
      await this.onModuleInit();
    }

    return this.channel;
  }
}
