import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type AlertDocument = HydratedDocument<Alert>;

@Schema()
export class Alert {
  @Prop()
  userId:string;

  @Prop()
  latitude:number;

  @Prop()
  longitude:number;
  
  @Prop()
  type:number;
  
  @Prop()
  description:string;
  
  @Prop()
  registeredAt:Date;

  @Prop()
  state:number;

}

export const AlertSchema = SchemaFactory.createForClass(Alert);