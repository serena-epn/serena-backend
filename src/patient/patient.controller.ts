import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body, Query, Param } from '@nestjs/common';
import { PatientService } from './patient.service';

import {CreatePatientDTO, LinkUnlinkDeviceDTO, UpdatePatientDTO} from './dto/patient.dto'
import { ApiBearerAuth, ApiExtension, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { SocketService } from 'src/socket/socket.service';

@ApiTags('patient')
@Controller('patient')
export class PatientController {

    constructor(private readonly patientService:PatientService,private readonly socketService:SocketService){}

    @Post()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createPatient(@Res() res,@Body() createPatientDTO:CreatePatientDTO){
        
        const createdPatient = await this.patientService.createPatient(createPatientDTO);
        
        return res.status(HttpStatus.OK).json({
            createdPatient
        })
    }

    //@ApiBearerAuth()
    @Get()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getPatient(@Res() res){
        console.log("GEEeeeeeeettttt")
        const patients = await this.patientService.getPatients();
        //this.socketService.socket.emit("updateGeoLoc",{latitude: -0.122527,        longitude: -78.465901})
        return res.status(HttpStatus.OK).json({
            patients
        })
    }

    @Get('getUnlinkedUserPatients')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUnlinkedPatient(@Res() res){
        console.log("GEEeeeeeeettttt")
        const patients = await this.patientService.getUnlinkedUserPatients();
        //this.socketService.socket.emit("updateGeoLoc",{latitude: -0.122527,        longitude: -78.465901})
        return res.status(HttpStatus.OK).json({
            patients
        })
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async getPatientById(@Res() res,@Param('id') patientId:string){
     
        const patient = await this.patientService.getPatientById(patientId);

        if(patient)
        {
            return res.status(HttpStatus.OK).json({
                ...patient["_doc"]
            })

        }
        else
        {
            return res.status(HttpStatus.NOT_FOUND).json({
                error:"patient not found"
            })
        }
    }

    @Put()
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async updatePatient(@Res() res,@Body() updatePatientDTO:UpdatePatientDTO){
  
        const updatedPatient = await this.patientService.updatePatient(updatePatientDTO);


        return res.status(HttpStatus.OK).json({
            updatedPatient
        })
    }
    
    @Put('/linkDevice')
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async linkDeviceToPatient(@Res() res,@Body() linkDeviceDto:LinkUnlinkDeviceDTO){
  
        const linkedPatient = await this.patientService.linkDevice(linkDeviceDto);


        return res.status(HttpStatus.OK).json({
            linkedPatient
        })
    }
    
    @Put('/unlinkDevice')
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async unlinkDeviceToPatient(@Res() res,@Body() unlinkDeviceDto:LinkUnlinkDeviceDTO){
  
        const unlinkedPatient = await this.patientService.unlinkDevice(unlinkDeviceDto);


        return res.status(HttpStatus.OK).json({
            unlinkedPatient
        })
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deletePatient(@Res() res,@Param('id') patientId:string){
    
        const deletedPatient = await this.patientService.deletePatient(patientId);


        if(deletedPatient)
        {
            return res.status(HttpStatus.OK).json({
                ...deletedPatient["_doc"]
            })

        }
        else
        {
            return res.status(HttpStatus.NOT_FOUND).json({
                error:"patient not found"
            })
        }
    }


}
