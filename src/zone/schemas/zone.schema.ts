import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Patient } from 'src/patient/schemas/patient.schema';

export type ZoneDocument = HydratedDocument<Zone>;

@Schema()
export class Zone {
  
  @Prop()
  latitude :number;
  
  @Prop()
  longitude :number;

  @Prop()
  radius :number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Patient' })
  patient: Patient;


}

export const ZoneSchema = SchemaFactory.createForClass(Zone);