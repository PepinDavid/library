import { Module } from '@nestjs/common';
import { RepositoryModule } from 'src/repository/repository.module';
import { AnalyticsProcessorService } from './analytics-processor.service';

@Module({
  imports: [RepositoryModule],
  providers: [AnalyticsProcessorService],
  exports: [AnalyticsProcessorService],
})
export class AnalyticsModule {}
