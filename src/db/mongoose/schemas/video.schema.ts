import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { AVAILABLE_RESOLUTIONS } from '../../../features/video/domain';

@Schema()
export class Video {
  @Prop({ type: Number })
  id: number;
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  author: string;
  @Prop({ type: Boolean })
  canBeDownloaded: boolean;
  @Prop({ required: false })
  minAgeRestriction?: number;
  @Prop({ type: Date })
  createdAt: Date;
  @Prop({ type: Date })
  publicationDate: Date;
  @Prop({
    type: [String],
    required: false,
    enum: Object.values(AVAILABLE_RESOLUTIONS),
  })
  availableResolutions?: AVAILABLE_RESOLUTIONS[];
}

export const VideoSchema = SchemaFactory.createForClass(Video);
