import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';
import { FirebaseService } from './firebase.service';


const firebaseProvider = {
  provide: 'FIREBASE_APP',
  inject: [ConfigService],
  useFactory: (configService: ConfigService) => {
    
    

    console.log('configService.....')
    console.log(configService.get('firebase'))

    return admin.initializeApp({
      credential: admin.credential.cert(configService.get('firebase')),
      databaseURL: 'serenaepn',
    });
  },
};

@Module({
    imports: [ConfigModule],
    providers: [firebaseProvider,FirebaseService],
    exports: [FirebaseService],
  })
export class FirebaseModule {}
