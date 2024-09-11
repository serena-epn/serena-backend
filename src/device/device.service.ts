import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Device, DeviceDocument } from './schemas/device.schema';
import { Model } from 'mongoose';
import { CreateDeviceDTO,UpdateDeviceDTO } from './dto/device.dto';
import { notEquals } from 'class-validator';

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device.name) private deviceModel:Model<DeviceDocument>,
    ){  }

    async createDevice (createDeviceDTO:CreateDeviceDTO){
        const createdDevice = await this.deviceModel.create(createDeviceDTO);
        return createdDevice;
    }


    async updateDevice (updateDeviceDTO:UpdateDeviceDTO){
        
        console.log('updateDeviceDTO')
        console.log(updateDeviceDTO)

        const updatedDevice = await this.deviceModel.findOneAndUpdate({_id:updateDeviceDTO._id},updateDeviceDTO,{new:true});
        
        return updatedDevice;
        
    }

    async deleteDevice (deviceId:string){
        
        let deletedDevice = await this.deviceModel.findByIdAndDelete(deviceId);
        
        return deletedDevice;
    }

    async getDeviceById (deviceId:string){
        
        const device = await this.deviceModel.findById(deviceId)
        
        return device;
    }

    async getDevices (){
        
        const devices = await this.deviceModel.find().populate('patient');
        
        return devices;
    }

    async getUnlinkedDevices(){
        console.log('unlinked........')
        const unlinkedDevices = await this.deviceModel.find({ patient: { $eq: null } }).populate('patient');


        return unlinkedDevices;
    }

    async getDevicesByUserId (userId:string,type:number|null){
        console.log("callledds")
        console.log(type)
        const devices =  type? await this.deviceModel.find({
            $and:[
                {userId:userId},
                {type:type}
            ]
        }): await this.deviceModel.find({userId:userId
        });
        
        return devices;
    }
}
