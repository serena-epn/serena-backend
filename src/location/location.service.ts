import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Location, LocationDocument } from './schemas/location.schema';
import { Model } from 'mongoose';
import { CreateLocationDTO,UpdateLocationDTO } from './dto/location.dto';
import { FirebaseService } from 'src/firebase/firebase.service';
import { UserService } from 'src/user/user.service';
import { AlertService } from 'src/alert/alert.service';

@Injectable()
export class LocationService {
    constructor(
        @InjectModel(Location.name) private locationModule:Model<LocationDocument>,
        private fireBaseService:FirebaseService,
        private userService:UserService,
        private alertService:AlertService
    ){  }

    haversine=(lat1: number, lon1: number, lat2: number, lon2: number): number =>{
        const R = 6371; // Radio de la Tierra en kilómetros
    
        // Convertir grados a radianes
        const toRadians = (degrees: number): number => degrees * (Math.PI / 180);
        const lat1Rad = toRadians(lat1);
        const lon1Rad = toRadians(lon1);
        const lat2Rad = toRadians(lat2);
        const lon2Rad = toRadians(lon2);
    
        // Diferencias de latitud y longitud
        const dLat = lat2Rad - lat1Rad;
        const dLon = lon2Rad - lon1Rad;
    
        // Aplicar fórmula de Haversine
        const a = Math.sin(dLat / 2) ** 2 + Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dLon / 2) ** 2;
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
        // Calcular la distancia
        const distance = R * c;
        return distance;
    }
    

    async createLocation (createLocationDTO:CreateLocationDTO){

        // console.log('Notifffff......')
        // this.fireBaseService.messaging().send

        console.log('createLocationDTO ....')
        console.log(createLocationDTO)

        const user= await this.userService.getUserByDeviceImei(createLocationDTO.deviceImei)


        console.log('createLocation user>>>')
        console.log(user)



        // Coordenadas iniciales

        console.log('Coordenadas iniciales Coordenadas inicialesCoordenadas inicialesCoordenadas iniciales')
        
        
        const lat1 = createLocationDTO.latitude;
        const lon1 = createLocationDTO.longitude;
        
        console.log('lat1')
        console.log(lat1)
        console.log('lon1')
        console.log(lon1)
        

        // Coordenadas finales
        const lat2 = user.patient.zone.latitude;
        const lon2 = user.patient.zone.longitude;
        
        console.log('lat2')
        console.log(lat2)
        console.log('lon2')
        console.log(lon2)
        
        // Calcular la distancia
        const distance = this.haversine(lat1, lon1, lat2, lon2);
        console.log(`La distancia es ${distance} kilómetros`);

        if(distance>user.patient.zone.radius)
        {
            this.alertService.createAlert({
                userId:user._id,
                latitude:lat1,
                longitude:lon1,
                type:1,
                description:'',
                registeredAt:new Date(),
            })
            this.fireBaseService.sendNotif(user.applicationToken,'Alerta de abandono de zona segura','El afectado '+user.patient.name+" "+
                user.patient.lastname+' ha salido de su zona segura de tránsito'
            )

        }



        const createdLocation = await this.locationModule.create(createLocationDTO);
        return createdLocation;
    }


    async updateLocation (updateLocationDTO:UpdateLocationDTO){
        
        const updatedLocation = await this.locationModule.findOneAndUpdate({_id:updateLocationDTO._id},updateLocationDTO,{new:true});
        
        return updatedLocation;
    }

    async deleteLocation (locationId:string){
        
        let deletedLocation = await this.locationModule.findByIdAndDelete(locationId);
        
        return deletedLocation;
    }

    async getLocationById (locationId:string){
        
        const location = await this.locationModule.findById(locationId)
        
        return location;
    }

    async getLocations (){
        
        const locations = await this.locationModule.find();
        
        return locations;
    }
}
