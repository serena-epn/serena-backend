import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";
import mongoose from "mongoose";


export class CreateLocationDTO{

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    deviceImei:number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type:Number
    })
    latitude :number;
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type:Number
    })
    longitude :number;
    
    @ApiProperty({
        type:Date
    })
    @IsNotEmpty()
    registeredAt:Date;
}

export class UpdateLocationDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    _id:mongoose.Types.ObjectId;


    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    deviceImei:number;

    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    coordinateId:mongoose.Types.ObjectId;
    
    @ApiProperty({
        type:Date
    })
    @IsNotEmpty()
    registeredAt:Date;
}