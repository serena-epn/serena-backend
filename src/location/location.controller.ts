import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body, Param, Query } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDTO, UpdateLocationDTO } from './dto/location.dto';
import { ApiExtension, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Location } from './schemas/location.schema';
import { SocketService } from 'src/socket/socket.service';

@ApiTags('location')
@Controller('location')
export class LocationController {
    constructor(private readonly locationService:LocationService,private readonly socketService:SocketService){}

    @Post()
    async createLocation(@Res() res,@Body() createLocationDTO:CreateLocationDTO){

        const createdLocation = await this.locationService.createLocation(createLocationDTO);

        return res.status(HttpStatus.OK).json({
            createdLocation
        })
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getLocation(@Res() res):Promise<Location[]>{
        const locations = await this.locationService.getLocations();
        return res.status(HttpStatus.OK).json({
            locations
        })
    }

    @Get('/updateDeviceLocation')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async updateDeviceLocation(@Query() query,@Res() res):Promise<boolean>{
        //const locations = await this.locationService.getLocations();
            const deviceImei=query.deviceImei;
            console.log(deviceImei)
            const createLocationDTO = {
                deviceImei: parseInt( query.deviceImei),
                latitude :parseFloat(query.latitude),
                longitude :parseFloat(query.longitude),
                registeredAt:new Date(),
            } as CreateLocationDTO
            
            console.log(createLocationDTO)

            this.socketService.sendMessageToClient(deviceImei,'updateGeoLoc',{data:createLocationDTO})
            
            const createdLocation = await this.locationService.createLocation(createLocationDTO);
            // this.socketService.socket
             //this.socketService.socket.to('asd').emit("updateGeoLoc",{latitude: -0.122527,longitude: -78.465901})

            return res.status(HttpStatus.OK).json({
                response:true
            })
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async getLocationById(@Res() res,@Param('id') locationId:string){
        const location = await this.locationService.getLocationById(locationId);
        return res.status(HttpStatus.OK).json({
            location
        })
    }

    @Put()
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async updateLocation(@Res() res,@Body() updateLocationDTO:UpdateLocationDTO){
        const updatedLocation = await this.locationService.updateLocation(updateLocationDTO);
        return res.status(HttpStatus.OK).json({
            updatedLocation
        })
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteLocation(@Res() res,@Param('id') locationId:string){
        const result = await this.locationService.deleteLocation(locationId);
        return res.status(HttpStatus.OK).json({
            result
        })
    }
}
