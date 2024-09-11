import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreatePatientDTO{
    @ApiProperty({
        type: String,
      })
      name: string;
    
      @ApiProperty({
        type: String,
      })
      lastname: string;
    
      @ApiProperty({
        type: String,
      })
      birthdate: string;
    
      @ApiProperty({
        type: String,
      })
      contactInfo: string;
    
      @ApiProperty({
        type: String,
      })
      idNumber: string;
      
      @ApiProperty({
        type: mongoose.Types.ObjectId,
      })
      device:null;
      
      @ApiProperty({
        type: mongoose.Types.ObjectId,
      })
      user:null;
    
      @ApiProperty({
        type: Date,
      })
      createdAt: Date;

      
}

export class UpdatePatientDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    _id:mongoose.Types.ObjectId;
    @ApiProperty({
      type: String,
    })
    name: string;
  
    @ApiProperty({
      type: String,
    })
    lastname: string;
  
    @ApiProperty({
      type: String,
    })
    birthdate: string;
  
    @ApiProperty({
      type: String,
    })
    contactInfo: string;
  
    @ApiProperty({
      type: String,
    })
    idNumber: string;
    
    @ApiProperty({
      type: mongoose.Types.ObjectId,
    })
    user:null;

    @ApiProperty({
      type: String,
    })
    device:string;
  
    @ApiProperty({
      type: Date,
    })
    createdAt: Date;
}

export class LinkUnlinkDeviceDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    patientId:mongoose.Types.ObjectId;
    @ApiProperty({
      type: String,
    })
    deviceId: mongoose.Types.ObjectId;

}

