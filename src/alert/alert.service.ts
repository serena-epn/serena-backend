import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Alert, AlertDocument } from './schemas/alert.schema';
import mongoose, { Model } from 'mongoose';
import { CreateAlertDTO,FindByUserIdDTO,UpdateAlertDTO } from './dto/alert.dto';

@Injectable()
export class AlertService {
    constructor(
        @InjectModel(Alert.name) private alertModel:Model<AlertDocument>,
    ){  }

    async createAlert (createAlertDTO:CreateAlertDTO){
        const createdAlert = await this.alertModel.create(createAlertDTO);
        return createdAlert;
    }


    async updateAlert (updateAlertDTO:UpdateAlertDTO){
        
        //const updatedAlert = await this.alertModel.findOneAndUpdate({_id:updateAlertDTO._id},updateAlertDTO,{new:true});
        
        //return updatedAlert;
        return null;
    }

    async deleteAlert (alertId:string){
        
        let deletedAlert = await this.alertModel.findByIdAndDelete(alertId);
        
        return deletedAlert;
    }

    async getAlertById (alertId:string){
        
        const alert = await this.alertModel.findById(alertId)
        
        return alert;
    }

    async getAlerts (){
        
        const alerts = await this.alertModel.find();
        
        return alerts;
    }

    async getAlertsByUserId (findByUserIdDTO:FindByUserIdDTO){
        console.log("callledds")
        console.log(findByUserIdDTO)


        const alerts =  findByUserIdDTO.type? await this.alertModel.find({
            $and:[
                {userId:findByUserIdDTO.userId},
                {type:findByUserIdDTO.type}
            ]
        }): await this.alertModel.find({userId:findByUserIdDTO.userId});
        
        return alerts;
    }
}
