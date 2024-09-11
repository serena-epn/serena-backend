import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Zone, ZoneDocument } from './schemas/zone.schema';
import { Model } from 'mongoose';
import { CreateZoneDTO,UpdateZoneDTO } from './dto/zone.dto';
import { Patient, PatientDocument } from 'src/patient/schemas/patient.schema';

@Injectable()
export class ZoneService {
    constructor(
        @InjectModel(Zone.name) private zoneModel:Model<ZoneDocument>,
        @InjectModel(Patient.name) private patientModel:Model<PatientDocument>,
    ){  }

    async createZone (createZoneDTO:CreateZoneDTO){
        const createdZone = await this.zoneModel.create(createZoneDTO);
        if(createdZone)
        {
            
            const updatedUser = await this.patientModel.findOneAndUpdate({_id:createZoneDTO.patient},{zone:createdZone._id},{new:true});
        }
        return createdZone;
    }


    async updateZone (updateZoneDTO:UpdateZoneDTO){
        
        const updatedZone = await this.zoneModel.findOneAndUpdate({_id:updateZoneDTO._id},updateZoneDTO,{new:true});
        
        return updatedZone;
    }

    async deleteZone (zoneId:string){
        
        let deletedZone = await this.zoneModel.findByIdAndDelete(zoneId);
        
        return deletedZone;
    }

    async getZoneById (zoneId:string){
        
        const zone = await this.zoneModel.findById(zoneId)
        
        return zone;
    }

    async getZones (){
        
        const zones = await this.zoneModel.find();
        
        return zones;
    }
}
