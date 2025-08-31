import { Prop } from '@nestjs/mongoose';
import { SchemaTypes, Types, Document } from 'mongoose';

export class AbstractDocument {
  @Prop({ type: SchemaTypes.ObjectId })
  _id: Types.ObjectId;
}
