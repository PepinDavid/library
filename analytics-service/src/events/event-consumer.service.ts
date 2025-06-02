/* eslint-disable @typescript-eslint/no-misused-promises */
import { Injectable, OnModuleInit } from '@nestjs/common';
import { AnalyticsProcessorService } from 'src/analytics/analytics-processor.service';
import { RabbitMQService } from 'src/rabbitmq/rabbitmq.service';

@Injectable()
export class EventConsumerService implements OnModuleInit {
  constructor(
    private readonly rabbitMQService: RabbitMQService,
    private readonly analyticsProcessor: AnalyticsProcessorService,
  ) {}

  async onModuleInit() {
    const channel = await this.rabbitMQService.getChannel();
    const queue = process.env.ANALYTICS_QUEUE || 'analytics_queue';
    const exchange = process.env.LIBRARY_EXCHANGE || 'library_exchange';
    const routingKey = process.env.BOOK_EVENT_ROUTINGKEY || 'book.event.create';

    await channel.assertExchange(exchange, 'topic', { durable: true });
    await channel.assertQueue(queue, { durable: true });
    await channel.bindQueue(queue, exchange, routingKey);

    channel.consume(queue, async (msg) => {
      console.log(msg);
      if (msg) {
        try {
          const event = JSON.parse(msg.content.toString());
          await this.analyticsProcessor.process(event);
          channel.ack(msg);
        } catch (error) {
          console.error('Analytics Event handling error:', error);
          channel.nack(msg, false, false);
        }
      }
    });

    console.log(`[*] Listening to "${queue}" on exchange "${exchange}"`);
  }
}