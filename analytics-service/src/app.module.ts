import { Module } from '@nestjs/common';
import { RabbitMQModule } from './rabbitmq/rabbitmq.module';
import { EventModule } from './events/event.module';
import { AnalyticsModule } from './analytics/analytics-processor.module';
import { RepositoryModule } from './repository/repository.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URI!),
    RabbitMQModule,
    RepositoryModule,
    AnalyticsModule,
    EventModule,
  ],
})
export class AppModule {}
