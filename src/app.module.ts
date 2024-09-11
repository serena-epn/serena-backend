import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ZoneModule } from './zone/zone.module';
import { LocationModule } from './location/location.module';
import { AlertModule } from './alert/alert.module';
import { SocketModule } from './socket/socket.module';
import { AppGateway } from './app.gateway';
import { AuthModule } from './auth/auth.module';
import { AuthGuard } from './auth/auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { PatientModule } from './patient/patient.module';
import { DeviceModule } from './device/device.module';

import { ConfigModule } from '@nestjs/config';
import { FirebaseModule } from './firebase/firebase.module';



import * as fs from 'fs';
import * as path from 'path';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [
      () => {
        const configPath = path.resolve(__dirname, '../src/', 'serenaepn-firebase-adminsdk-ewlq5-8575867f1b.json');
        const config = JSON.parse(fs.readFileSync(configPath, 'utf-8'));
        return config;
      },
    ],
  }),MongooseModule.forRoot('mongodb://localhost:27017/SERENA'), UserModule, ZoneModule, LocationModule, 
    AlertModule, SocketModule, AuthModule, PatientModule, DeviceModule,
    ConfigModule.forRoot({ cache: true }),
    FirebaseModule,
    
  ],
  controllers: [AppController],
  providers: [AppService,AppGateway,
  {
    provide: APP_GUARD,
    useClass: AuthGuard,
  },
],
})
export class AppModule {}
