import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../core/orms/mongoose/mongodb/base.schema';

@Schema()
export class Blog extends BaseSchema {
  @Prop({ type: String, required: true })
  name: string;
  @Prop({ type: String, required: true })
  description: string;
  @Prop({ type: String, required: true })
  websiteUrl: string;
  @Prop({ type: Boolean, required: false })
  isMembership: boolean;
}

export const BlogSchema = SchemaFactory.createForClass(Blog);
