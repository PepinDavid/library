import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AnalyticsEvent, AnalyticsEventSchema } from 'src/analytics/analytics-event.schema';
import { AnalyticsRepositoryService } from './analytics-repository.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AnalyticsEvent.name, schema: AnalyticsEventSchema },
    ]),
  ],
  providers: [AnalyticsRepositoryService],
  exports: [AnalyticsRepositoryService],
})
export class RepositoryModule {}
