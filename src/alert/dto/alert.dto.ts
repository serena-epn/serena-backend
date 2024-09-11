import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsInt, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class CreateAlertDTO{
    
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    userId:mongoose.Types.ObjectId;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    latitude:number;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    longitude:number;
    
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        type:Number
    })
    type:number;
    
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    description:string;
    
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    registeredAt:Date;
    
}

export class FindByUserIdDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    userId:string;

    @ApiProperty({
        type:Number
    })
    type?:number;
}

export class UpdateAlertDTO{
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    userId:mongoose.Types.ObjectId;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    latitude:number;

    @IsNotEmpty()
    @ApiProperty({
        type:Number
    })
    longitude:number;
    
    @IsNotEmpty()
    @IsInt()
    @ApiProperty({
        type:Number
    })
    type:number;
    
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    description:string;
    
    @IsNotEmpty()
    @ApiProperty({
        type:String
    })
    registeredAt:Date;
    
}