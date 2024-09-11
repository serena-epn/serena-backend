import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body, Param, Query } from '@nestjs/common';
import { DeviceService } from './device.service';
import { CreateDeviceDTO, UpdateDeviceDTO } from './dto/device.dto';
import { ApiExtension, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Device } from './schemas/device.schema';

@ApiTags('device')
@Controller('device')
export class DeviceController {
    constructor(private readonly deviceService:DeviceService){}

    @Post()
    async createDevice(@Res() res,@Body() createDeviceDTO:CreateDeviceDTO){
        console.log(createDeviceDTO)
        const createdDevice = await this.deviceService.createDevice(createDeviceDTO);

        return res.status(HttpStatus.OK).json({
            createdDevice
        })
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getDevice(@Res() res):Promise<Device[]>{
        const devices = await this.deviceService.getDevices();
        return res.status(HttpStatus.OK).json({
            devices
        })
    }
    
    @Get('/unlinked')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUnlinkedDevices(@Res() res):Promise<Device[]>{
        const devices = await this.deviceService.getUnlinkedDevices();
        return res.status(HttpStatus.OK).json({
            devices
        })
    }

    // @Get('/byUserId')
    // @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    // @ApiResponse({ status: 404, description: 'Not Found.'})
    // async getDevicesByUserId(@Res() res,@Query('userId') userId: string,
    // @Query('type') type?: number){
    //     console.log("type")
    //     console.log(type)
    //     console.log("userId")
    //     console.log(userId)
    //     const devices = await this.deviceService.getDevicesByUserId(userId,type);
    //     return res.status(HttpStatus.OK).json({
    //         devices
    //     })
        
    // }


    @Get(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async getDeviceById(@Res() res,@Param('id') deviceId:string){
        const device = await this.deviceService.getDeviceById(deviceId);
        return res.status(HttpStatus.OK).json({
            device
        })
    }

    

    @Put()
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async updateDevice(@Res() res,@Body() updateDeviceDTO:UpdateDeviceDTO){
        const updatedDevice = await this.deviceService.updateDevice(updateDeviceDTO);
        return res.status(HttpStatus.OK).json({
            updatedDevice
        })
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteDevice(@Res() res,@Param('id') deviceId:string){
        const result = await this.deviceService.deleteDevice(deviceId);
        return res.status(HttpStatus.OK).json({
            result
        })
    }
}
