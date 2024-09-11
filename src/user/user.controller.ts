import { Controller,Get,Post,Put,Delete,Res,HttpStatus,Body, Query, Param } from '@nestjs/common';
import { UserService } from './user.service';

import {CreateUserDTO, UpdateUserDTO, linkUnlinkPatientDto} from './dto/user.dto'
import { ApiBearerAuth, ApiExtension, ApiHeader, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import mongoose from 'mongoose';
import { SocketService } from 'src/socket/socket.service';

@ApiTags('user')
@Controller('user')
export class UserController {

    constructor(private readonly userService:UserService,private readonly socketService:SocketService){}

    @Post()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async createUser(@Res() res,@Body() createUserDTO:CreateUserDTO){
        console.log(createUserDTO)
        const createdUser = await this.userService.createUser(createUserDTO);
        
        return res.status(HttpStatus.OK).json({
            createdUser
        })
    }

    @ApiBearerAuth()
    @Get()
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getUser(@Res() res){
        const users = await this.userService.getUsers();
        //this.socketService.socket.emit("updateGeoLoc",{latitude: -0.122527,        longitude: -78.465901})
        return res.status(HttpStatus.OK).json({
            users
        })
    }

    @Get('/getAdmins')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getAdmins(@Res() res){
        console.log("GEEeeeeeeettttt admins")
        const users = await this.userService.getAdmins();
        
        return res.status(HttpStatus.OK).json({
            users
        })
    }

    @Get('/getCaregivers')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async getCaregivers(@Res() res){
        console.log("GEEeeeeeeettttt caregivers")
        const caregivers = await this.userService.getCaregivers();
   
        return res.status(HttpStatus.OK).json({
            caregivers
        })
    }

    @Get(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully created.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async getUserById(@Res() res,@Param('id') userId:string){
     
        const user = await this.userService.getUserById(userId);

        if(user)
        {
            return res.status(HttpStatus.OK).json({
                ...user["_doc"]
            })

        }
        else
        {
            return res.status(HttpStatus.NOT_FOUND).json({
                error:"user not found"
            })
        }
    }

    @Put()
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async updateUser(@Res() res,@Body() updateUserDTO:UpdateUserDTO){
        console.log(updateUserDTO)
        const updatedUser = await this.userService.updateUser(updateUserDTO);


        return res.status(HttpStatus.OK).json({
            updatedUser
        })
    }
    @Put('/linkPatient')
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async linkPatientToUser(@Res() res,@Body() linkPatientDto:linkUnlinkPatientDto){
        console.log(linkPatientDto)
        const updatedUser = await this.userService.linkPatient(linkPatientDto);
        return res.status(HttpStatus.OK).json({
            updatedUser
        })
    }
    
    @Put('/unlinkPatient')
    @ApiResponse({ status: 200, description: 'The record has been successfully updated.'})
    @ApiResponse({ status: 404, description: 'Not Found.'})
    async unlinkPatientToUser(@Res() res,@Body() unlinkPatientDto:linkUnlinkPatientDto){
        console.log(unlinkPatientDto)
        const updatedUser = await this.userService.unlinkPatient(unlinkPatientDto);
        return res.status(HttpStatus.OK).json({
            updatedUser
        })
    }

    @Delete(':id')
    @ApiResponse({ status: 200, description: 'The record has been successfully deleted.'})
    @ApiResponse({ status: 403, description: 'Forbidden.'})
    async deleteUser(@Res() res,@Param('id') userId:string){
    
        const deletedUser = await this.userService.deleteUser(userId);


        if(deletedUser)
        {
            return res.status(HttpStatus.OK).json({
                ...deletedUser["_doc"]
            })

        }
        else
        {
            return res.status(HttpStatus.NOT_FOUND).json({
                error:"user not found"
            })
        }
    }


}
