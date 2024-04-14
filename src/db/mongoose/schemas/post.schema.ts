import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { BaseSchema } from '../../../core/orms/mongoose/mongodb/base.schema';

@Schema()
export class Post extends BaseSchema {
  @Prop({ type: String, required: true })
  title: string;
  @Prop({ type: String, required: true })
  shortDescription: string;
  @Prop({ type: String, required: true })
  content: string;
  @Prop({ type: String, required: true })
  blogId: string;
  @Prop({ type: String, required: true })
  blogName: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
