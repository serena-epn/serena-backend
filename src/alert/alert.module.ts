import { Module } from '@nestjs/common';
import { AlertService } from './alert.service';
import { AlertController } from './alert.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { AlertSchema } from './schemas/alert.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Alert',
        schema:AlertSchema
      }
    ])
  ],
  providers: [AlertService],
  controllers: [AlertController],
  exports:[AlertService]
})
export class AlertModule {}
