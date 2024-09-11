import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body, Param } from '@nestjs/common';
import { ZoneService } from './zone.service';
import { CreateZoneDTO, UpdateZoneDTO } from './dto/zone.dto';
import { ApiExtension, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Zone } from './schemas/zone.schema';

@ApiTags('zone')
@Controller('zone')
export class ZoneController {
    constructor(private readonly zoneService:ZoneService){}

    @Post()
    async createZone(@Res() res,@Body() createZoneDTO:CreateZoneDTO){

        const createdZone = await this.zoneService.createZone(createZoneDTO);

        return res.status(HttpStatus.OK).json({
            createdZone
        })
    }

    @Get()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getZone(@Res() res):Promise<Zone[]>{
        const zones = await this.zoneService.getZones();
        return res.status(HttpStatus.OK).json({
            zones
        })
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async getZoneById(@Res() res,@Param('id') zoneId:string){
        const zone = await this.zoneService.getZoneById(zoneId);
        return res.status(HttpStatus.OK).json({
            zone
        })
    }

    @Put()
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async updateZone(@Res() res,@Body() updateZoneDTO:UpdateZoneDTO){

        console.log('updateZoneDTO')
        console.log(updateZoneDTO)

        const updatedZone = await this.zoneService.updateZone(updateZoneDTO);
        return res.status(HttpStatus.OK).json({
            updatedZone
        })
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteZone(@Res() res,@Param('id') zoneId:string){
        const result = await this.zoneService.deleteZone(zoneId);
        return res.status(HttpStatus.OK).json({
            result
        })
    }
}
