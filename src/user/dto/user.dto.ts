import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateUserDTO{
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
      phone: string;
    
      @ApiProperty({
        type: String,

      })
      email: string;
    
      @ApiProperty({
        type: String,
      })
      password: string;
    
      @ApiProperty({
        type: String,
      })
      idNumber: string;

      @ApiProperty({
        type: Number,
      })
      userType: number;
    
      @ApiProperty({
        type: Date,
      })
      createdAt: Date;

      @ApiProperty({
        type: String,
      })
      applicationToken:string

      // @ApiProperty({
      //   type: mongoose.Schema.Types.ObjectId,
      // })
      // patientId: mongoose.Schema.Types.ObjectId;

      @ApiProperty({
        type: String,
      })
      patientId: string;
      
}

export class UpdateUserDTO{
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
      phone: string;

      @ApiProperty({
        type: Number,
      })
      userType: number;
    
      @ApiProperty({
        type: String,
      })
      email: string;
    
      @ApiProperty({
        type: String,
      })
      password: string;
    
      @ApiProperty({
        type: String,
      })
      idNumber: string;
      
      @ApiProperty({
        type: String,
      })
      applicationToken:string;
    
      @ApiProperty({
        type: Date,
      })
      createdAt: Date;
      @ApiProperty({
        type: String,
      })
      patientId: string;
}

export class linkUnlinkPatientDto
{
    @ApiProperty({
      type: String,
    })
    userId: mongoose.Types.ObjectId;
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    patientId:mongoose.Types.ObjectId;
}