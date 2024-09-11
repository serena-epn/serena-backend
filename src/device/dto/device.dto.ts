import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import mongoose from "mongoose";


export class CreateDeviceDTO{
    
    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    imei :number;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    phoneNumber :string;
    
    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    serialNumber :string;
 
    
    @ApiProperty({
        type:Date
    })
    @IsNotEmpty()
    registeredAt:Date;
    
        
    @ApiProperty({
        type:Date
    })
    @IsNotEmpty()
    lastUpdateAt:Date;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    batteryCapacity:number;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    updateTime:number;
    
    @ApiProperty({
        type:Number
    })
    batteryPercentage:number=15;
    
    @ApiProperty({
        type:Number
    })
    batteryTime:number=5;
    
    @ApiProperty({
        type:Number
    })
    locationTime:number=0;
    

    // @IsNotEmpty()
    // @ApiProperty({
    //     type:String
    // })
    // userId:mongoose.Types.ObjectId;
    
    // @IsNotEmpty()
    // @ApiProperty({
    //     type:String
    // })
    // patientId:mongoose.Types.ObjectId;
  
}

export class UpdateDeviceDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    _id:mongoose.Types.ObjectId;
    
    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    imei :number;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    phoneNumber :string;
    
    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    serialNumber :string;
 
    
    @ApiProperty({
        type:Date
    })
    @IsNotEmpty()
    registeredAt:Date;
    
        
    @ApiProperty({
        type:Date
    })
    @IsNotEmpty()
    lastUpdateAt:Date;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    batteryCapacity:number;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    updateTime:number;

    @ApiProperty({
        type:Number
    })
    batteryPercentage?:number;
    
    @ApiProperty({
        type:Number
    })
    batteryTime?:number;
    
    @ApiProperty({
        type:Number
    })
    locationTime?:number;
}