import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class AnalyticsEvent extends Document {
  @Prop({
    type: String,
    required: true,
  })
  type: string;

  @Prop({
    type: Object,
    required: true,
  })
  data: Record<string, any>;
}

export type AnalyticsEventDocument = AnalyticsEvent & Document;
export const AnalyticsEventSchema = SchemaFactory.createForClass(AnalyticsEvent);