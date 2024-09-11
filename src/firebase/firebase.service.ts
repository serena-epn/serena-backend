
import { Inject, Injectable } from '@nestjs/common';
import { app } from 'firebase-admin';

@Injectable()
export class FirebaseService {
  

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    
  }

  async sendNotif (applicationToken:string,inputTitle:string,inputBody:string){

    console.log('Notifffff......')
    this.firebaseApp.messaging().send({
        token:applicationToken,
        notification:{
            title:inputTitle,
            body:inputBody,
        },
        
    })
    
}
}