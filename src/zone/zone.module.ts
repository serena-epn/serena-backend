import { Module } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { ZoneController } from './zone.controller';
import { ZoneSchema } from './schemas/zone.schema';
import { PatientSchema } from 'src/patient/schemas/patient.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Zone',
        schema:ZoneSchema
      }
    ]),
    MongooseModule.forFeature([
      {
        name:'Patient',
        schema:PatientSchema
      }
    ]),
  ],
  providers: [ZoneService],
  controllers: [ZoneController]
})
export class ZoneModule {}
