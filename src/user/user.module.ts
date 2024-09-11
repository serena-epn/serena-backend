import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schemas/user.schema';
import { PatientSchema } from 'src/patient/schemas/patient.schema';

@Module({
  imports:[
    MongooseModule.forFeature([
      {
        name:'User',
        schema:UserSchema
      }
    ]),
    MongooseModule.forFeature([
      {
        name:'Patient',
        schema:PatientSchema
      }
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
