import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body, Param, Query } from '@nestjs/common';
import { AlertService } from './alert.service';
import { CreateAlertDTO, FindByUserIdDTO, UpdateAlertDTO } from './dto/alert.dto';
import { ApiExtension, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Alert } from './schemas/alert.schema';
import mongoose from 'mongoose';

@ApiTags('alert')
@Controller('alert')
export class AlertController {
    constructor(private readonly alertService:AlertService){}

    @Post()
    async createAlert(@Res() res,@Body() createAlertDTO:CreateAlertDTO){

        const createdAlert = await this.alertService.createAlert(createAlertDTO);

        return res.status(HttpStatus.OK).json({
            createdAlert
        })
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAlert(@Res() res):Promise<Alert[]>{
        const alerts = await this.alertService.getAlerts();
        return res.status(HttpStatus.OK).json({
            alerts
        })
    }

    @Post('/byUserId')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async getAlertsByUserId(@Res() res,@Body() findByUserIdDTO:FindByUserIdDTO){
        console.log("type")
        console.log(findByUserIdDTO.type)
        console.log("userId")
        console.log(findByUserIdDTO.userId)
        const alerts = await this.alertService.getAlertsByUserId(findByUserIdDTO);
        return res.status(HttpStatus.OK).json({
            alerts
        })
        
    }


    @Get(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async getAlertById(@Res() res,@Param('id') alertId:string){
        const alert = await this.alertService.getAlertById(alertId);
        return res.status(HttpStatus.OK).json({
            alert
        })
    }

    

    @Put()
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async updateAlert(@Res() res,@Body() updateAlertDTO:UpdateAlertDTO){
        const updatedAlert = await this.alertService.updateAlert(updateAlertDTO);
        return res.status(HttpStatus.OK).json({
            updatedAlert
        })
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteAlert(@Res() res,@Param('id') alertId:string){
        const result = await this.alertService.deleteAlert(alertId);
        return res.status(HttpStatus.OK).json({
            result
        })
    }
}
