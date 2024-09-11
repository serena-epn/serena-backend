import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientService } from './patient.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PatientSchema } from './schemas/patient.schema';
import { DeviceSchema } from 'src/device/schemas/device.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Patient',
        schema:PatientSchema
      }
    ]),
    MongooseModule.forFeature([
      {
        name:'Device',
        schema:DeviceSchema
      }
    ]),
  ],
  controllers: [PatientController],
  providers: [PatientService],
  exports: [PatientService]
})
export class PatientModule {}
