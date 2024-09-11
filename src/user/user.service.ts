import { Injectable } from '@nestjs/common';
import mongoose, { Model, ObjectId, Types } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { User,UserDocument } from './schemas/user.schema';
import { Patient,PatientDocument } from 'src/patient/schemas/patient.schema';
import { CreateUserDTO, UpdateUserDTO, linkUnlinkPatientDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {

    constructor(
        @InjectModel(User.name) private userModel:Model<UserDocument>,
        @InjectModel(Patient.name) private patientModel:Model<PatientDocument>,
    ){  }

    async createUser (createUserDTO:CreateUserDTO){
        // console.log(createUserDTO)
        // console.log("Creatingggggg")
        const salt = await bcrypt.genSalt(10);
        // Genera el hash de la contraseña usando el salt
        const hashedPassword = await bcrypt.hash(createUserDTO.password, salt);
        createUserDTO.password = hashedPassword;
        const createdUser = await this.userModel.create(createUserDTO);
        //console.log("ended Creatingggggg")
        return createdUser;
    }

    async updateUser (updateUserDTO:UpdateUserDTO){
        
        console.log("userrrrr")
        console.log(updateUserDTO)

        const updatedUser = await this.userModel.findOneAndUpdate({_id:updateUserDTO._id},updateUserDTO,{new:true});
        console.log("updatedUser")
        console.log(updatedUser)
        return updatedUser;
    }

    async updateUserToken (userId:Types.ObjectId,applicationToken:string){
        
        console.log("userrrrr update token")
        console.log(applicationToken)

        const updatedUser = await this.userModel.findOneAndUpdate({_id:userId},{applicationToken:applicationToken},{new:true});
        console.log("updatedUser")
        console.log(updatedUser)
        return updatedUser;
    }

    async deleteUser (userId:string){
        
        const deletedUser = await this.userModel.findByIdAndDelete(userId);
        
        return deletedUser;
    }

    async getUserById (userId:string){
        
        const user = await this.userModel.findById(userId)
        
        return user;
    }

    async getUserByUserName (userName:string){
        
        const user = await this.userModel.findOne({name:userName})
        
        return user;
    }

    async getUserByDeviceImei (deviceImei:number){

        console.log('Device Imeiiii')
        console.log(deviceImei)

        
        const usersList = await this.userModel.find().populate(
            {
                path: 'patient',
                populate: [{
                    path: 'device',
                },
                {
                    path: 'zone',
                },
            ]
            }
        )
        console.log('usersList ------')
        console.log(usersList)
        const user = usersList.find((item)=>{
            return item.patient?.device?.imei===deviceImei
        })
        console.log('found user')
        console.log(user)
        return user;
    }


    async getUserByUserEmail (userEmail:string){
        
        const user = await this.userModel.findOne({email:userEmail}).populate(
            {
                path: 'patient',
                populate: [{
                    path: 'device',
                },
                {
                    path: 'zone',
                },
            ]
            }
        )
        
        return user;
    }

    async getUsers (){
        
        const users = await this.userModel.find().populate('patient');
        
        return users;
    }

    async getAdmins (){
        
        const users = await this.userModel.find({userType:1});
        
        return users;
    }

    async linkPatient(linkPatientDto:linkUnlinkPatientDto){
        console.log('link ...')
        console.log('linkPatientDto.. ');
        console.log(linkPatientDto);


        const updatedUser = await this.userModel.findOneAndUpdate({_id:linkPatientDto.userId},{patient:linkPatientDto.patientId},{new:true});
        const updatedPatient = await this.patientModel.findOneAndUpdate({_id:linkPatientDto.patientId},{user:linkPatientDto.userId},{new:true});
        console.log('updatedUser')
        console.log(updatedUser)
        console.log('updatedPatient')
        console.log(updatedPatient)
        return updatedUser.populate('patient');
    }

    async unlinkPatient(unlinkPatientDto:linkUnlinkPatientDto){
        console.log('link ...')
        console.log('unlinkPatientDto.. ');
        console.log(unlinkPatientDto);


        const updatedUser = await this.userModel.findOneAndUpdate({_id:unlinkPatientDto.userId},{patient:null},{new:true});
        const updatedPatient = await this.patientModel.findOneAndUpdate({_id:unlinkPatientDto.patientId},{user:null},{new:true});
        console.log('updatedUser')
        console.log(updatedUser)
        console.log('updatedPatient')
        console.log(updatedPatient)
        return updatedUser.populate('patient');
    }

    
        
        
    

    async getCaregivers (){
        
        const users = await this.userModel.find({userType:2}).populate(
            {
                path: 'patient',
                populate: [{
                    path: 'device',
                },
                {
                    path: 'zone',
                },]
            }
        )
        
        return users;
    }


}
