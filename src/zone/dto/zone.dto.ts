import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";
import mongoose from "mongoose";

export class CreateZoneDTO{
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
    
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type:Number
    })
    radius :number;

    @ApiProperty({
        type: String,
      })
      patient: string;


}

export class UpdateZoneDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    _id:mongoose.Types.ObjectId;


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

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        type:Number
    })
    radius :number;

}