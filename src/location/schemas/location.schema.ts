import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type LocationDocument = HydratedDocument<Location>;

@Schema()
export class Location {
  @Prop()
  deviceId:mongoose.Types.ObjectId;

  @Prop()
  latitude :number;
  
  @Prop()
  longitude :number;
  
  @Prop()
  registeredAt:Date;

}

export const LocationSchema = SchemaFactory.createForClass(Location);