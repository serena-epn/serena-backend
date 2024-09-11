import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Device } from 'src/device/schemas/device.schema';
import { User } from 'src/user/schemas/user.schema';
import { Zone } from 'src/zone/schemas/zone.schema';

export type PatientDocument = HydratedDocument<Patient>;

@Schema()
export class Patient {
  @Prop()
  name: string;
  
  @Prop()
  lastname: string;

  @Prop()
  birthdate: string;
  
  @Prop()
  contactInfo: string;

  @Prop()
  idNumber: string;
  
  @Prop()
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Device' })
  device:Device;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user:User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' })
  zone: Zone;

}

export const PatientSchema = SchemaFactory.createForClass(Patient);