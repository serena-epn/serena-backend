import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';

export type DeviceDocument = HydratedDocument<Device>;


@Schema()
export class Device {
  
  @Prop()
  imei :number;
  
  @Prop()
  phoneNumber :string;
  
  @Prop()
  serialNumber :string;
    
  @Prop()
  registeredAt:Date;
  
  @Prop()
  lastUpdateAt:Date;

  @Prop()
  batteryCapacity:number;
  
  @Prop()
  updateTime:number;
  
  @Prop({ default: 15 })
  batteryPercentage:number;

  @Prop({ default: 5 })
  batteryTime:number;
  
  @Prop({ default: 10 })
  locationTime:number;



  // @Prop()
  // userId:mongoose.Types.ObjectId;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
  patient:mongoose.Types.ObjectId;

}

export const DeviceSchema = SchemaFactory.createForClass(Device);