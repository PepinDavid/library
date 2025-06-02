import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AnalyticsEvent, AnalyticsEventDocument } from 'src/analytics/analytics-event.schema';

@Injectable()
export class AnalyticsRepositoryService {
  constructor(
    @InjectModel(AnalyticsEvent.name)
    private readonly analyticsModel: Model<AnalyticsEventDocument>,
  ) {}

  saveEvent(event: Partial<AnalyticsEvent>): Promise<AnalyticsEvent> {
    const doc = new this.analyticsModel(event);

    return doc.save();
  }
}
