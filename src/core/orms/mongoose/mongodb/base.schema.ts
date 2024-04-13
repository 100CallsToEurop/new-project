import { Document } from 'mongoose';
import { Prop } from '@nestjs/mongoose';
import { randomUUID } from 'crypto';

export class BaseSchema extends Document {
  @Prop({
    type: String,
    default: function genUUID() {
      return randomUUID();
    },
  })
  _id: string;
}
