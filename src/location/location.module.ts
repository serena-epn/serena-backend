import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema } from './schemas/location.schema';
import { FirebaseModule } from 'src/firebase/firebase.module';
import { UserModule } from 'src/user/user.module';
import { AlertModule } from 'src/alert/alert.module';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'Location',
        schema:LocationSchema
      }
    ])
    ,FirebaseModule,UserModule,AlertModule
  ],
  providers: [LocationService],
  controllers: [LocationController]
})
export class LocationModule {}
