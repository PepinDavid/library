import { Injectable } from '@nestjs/common';
import { AnalyticsRepositoryService } from 'src/repository/analytics-repository.service';

@Injectable()
export class AnalyticsProcessorService {
  constructor(private readonly repository: AnalyticsRepositoryService) {}

  async process(rawEvent: any): Promise<void> {
    const { type, data } = rawEvent;
    const cleanData = {
      type,
      data,
      createAt: new Date(),
    };
    console.log(cleanData);
    const saveEvent = await this.repository.saveEvent(cleanData);
    console.log(saveEvent)
  }
}
