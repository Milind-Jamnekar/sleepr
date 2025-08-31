import { AbstractDocument } from '@app/common/database/abstract.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ReservationDocument = HydratedDocument<Reservation>;

@Schema({ versionKey: false })
export class Reservation extends AbstractDocument {
  @Prop()
  timeStamp: Date;

  @Prop()
  startDate: Date;

  @Prop()
  endDate: Date;

  @Prop()
  userId: string;

  @Prop()
  placeId: string;

  @Prop()
  invoiceId: string;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);
