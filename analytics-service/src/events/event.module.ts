import { Module } from '@nestjs/common';
import { EventConsumerService } from './event-consumer.service';
import { RabbitMQModule } from 'src/rabbitmq/rabbitmq.module';
import { AnalyticsModule } from 'src/analytics/analytics-processor.module';

@Module({
  imports: [RabbitMQModule, AnalyticsModule],
  providers: [EventConsumerService],
  exports: [EventConsumerService],
})
export class EventModule {}
