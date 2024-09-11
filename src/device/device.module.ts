import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DeviceSchema } from './schemas/device.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Device',
        schema:DeviceSchema
      }
    ])
  ],
  providers: [DeviceService],
  controllers: [DeviceController]
})
export class DeviceModule {}
