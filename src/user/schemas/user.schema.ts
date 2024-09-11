import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as mongoose from 'mongoose';
import { Device } from 'src/device/schemas/device.schema';
import { Patient } from 'src/patient/schemas/patient.schema';
import { Location } from 'src/location/schemas/location.schema';
import { Zone } from 'src/zone/schemas/zone.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  name: string;
  
  @Prop()
  lastname: string;

  @Prop()
  birthdate: string;
  
  @Prop()
  phone: string;

  @Prop()
  email: string;

  @Prop()
  password: string;
  
  @Prop()
  idNumber: string;
  
  @Prop()
  createdAt: Date;

  @Prop()
  userType: number;

  @Prop()
  passwordReset: boolean; 
  
  @Prop()
  applicationToken: string;
 
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Device' })
  device:Device;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Zone' })
  zone:Zone;
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
  patient: Patient;
  
  

}

export const UserSchema = SchemaFactory.createForClass(User);