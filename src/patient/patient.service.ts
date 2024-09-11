import { Injectable } from '@nestjs/common';
import mongoose, { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Patient,PatientDocument } from './schemas/patient.schema';
import { Device,DeviceDocument } from 'src/device/schemas/device.schema';
import { CreatePatientDTO, LinkUnlinkDeviceDTO, UpdatePatientDTO } from './dto/patient.dto';
import { match } from 'assert';

@Injectable()
export class PatientService {

    constructor(
        @InjectModel(Patient.name) private patientModel:Model<PatientDocument>,
        @InjectModel(Device.name)  private deviceModel:Model<DeviceDocument>
    ){  }

    async createPatient (createPatientDTO:CreatePatientDTO){
        // console.log(createPatientDTO)
        // console.log("Creatingggggg")
        const createdPatient = await this.patientModel.create(createPatientDTO);
        //console.log("ended Creatingggggg")
        return createdPatient;
    }

    async updatePatient (updatePatientDTO:UpdatePatientDTO){
        
        const updatedPatient = await this.patientModel.findOneAndUpdate({_id:updatePatientDTO._id},updatePatientDTO,{new:true});
        
        return updatedPatient;
    }
    
    async linkDevice (linkDeviceDto:LinkUnlinkDeviceDTO){
        
        console.log(linkDeviceDto);

        // const patient = await this.patientModel.findById(linkDeviceDto.patientId)
        // console.log('found')
        //console.log(patient)
        //return patient;

        console.log('link ...')
        

        //const patient = await this.patientModel.findById(patiendId)
        
        const updatedPatient = await this.patientModel.findOneAndUpdate({_id:linkDeviceDto.patientId},{device:linkDeviceDto.deviceId},{new:true});
        const updatedDevice = await this.deviceModel.findOneAndUpdate({_id:linkDeviceDto.deviceId},{patient:linkDeviceDto.patientId},{new:true});
        console.log('updatedPatient')
        console.log(updatedPatient)
        console.log('updatedDevice')
        console.log(updatedDevice)
        return updatedPatient.populate('device');
    }

    async unlinkDevice (unlinkDeviceDto:LinkUnlinkDeviceDTO){
        
        

        // const patient = await this.patientModel.findById(linkDeviceDto.patientId)
        // console.log('found')
        //console.log(patient)
        //return patient;

        console.log('unlink ...')
        console.log('unlinkDeviceDto')
        console.log(unlinkDeviceDto)
        

        //const patient = await this.patientModel.findById(patiendId)
        
        const updatedPatient = await this.patientModel.findOneAndUpdate({_id:unlinkDeviceDto.patientId},{device:null},{new:true});
        const unlinkedDevice = await this.deviceModel.findOneAndUpdate({_id:unlinkDeviceDto.deviceId},{patient:null},{new:true});
        console.log('updatedPatient')
        console.log(updatedPatient)
        console.log('unlinkedDevice')
        console.log(unlinkedDevice)
        return updatedPatient.populate('device');
    }

    async deletePatient (patientId:string){
        
        const deletedPatient = await this.patientModel.findByIdAndDelete(patientId);
        
        return deletedPatient;
    }

    async getPatientById (patientId:string){
        
        const patient = (await this.patientModel.findById(patientId)).populate('device');
        
        return patient;
    }

    async getPatientByPatientName (patientName:string){
        
        const patient = await this.patientModel.findOne({name:patientName})
        
        return patient;
    }
    async getPatientByPatientEmail (patientEmail:string){
        
        const patient = await this.patientModel.findOne({email:patientEmail})
        
        return patient;
    }

    async getPatients (){
        
        const patients = await this.patientModel.find().populate('user').populate('device').populate('zone');
        
        return patients;
    }
    
    async getUnlinkedUserPatients (){
        
        const patients = await this.patientModel.find({user:{$eq:null}}).populate('user');
        
        return patients;
    }

}
