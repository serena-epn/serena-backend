import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {
    constructor(private userService:UserService,
        private jwtService: JwtService){}

    async signIn(username: string, password:string,applicationToken:string):Promise<any>{
        console.log("Sign in enter")
        const user = await this.userService.getUserByUserEmail(username);

        console.log(user)
        if(!user)
        {
            throw new UnauthorizedException();
        }
        if(user?.password!==password){
            throw new UnauthorizedException();
        }

        await this.userService.updateUserToken(user._id,applicationToken)

        const payload = { sub: user._id, username: user.name,email:user.email };

        

        return {
            user:{
                access_token: await this.jwtService.signAsync(payload),
        
                _id:user?._id,
                name:user?.name,
                lastname:user?.lastname,
                birthdate:user?.birthdate,
                phone:user?.phone,
                email:user?.email,
                patient:user?.patient,
                zone:user?.patient.zone,
                device:user?.patient.device,
                idNumber:user?.idNumber,
                userType:user?.userType
                }
        };
    }

    async adminLogin(userEmail: string, inputPassword:string):Promise<any>{
        console.log("Sign in admin")
        const user = await this.userService.getUserByUserEmail(userEmail);
               

        console.log(user)
        if(!user || user.userType!==1)
        {
            throw new UnauthorizedException();
        }
        // if(await bcrypt.compare(inputPassword, user.password)===false){
        //     throw new UnauthorizedException();
        // }


        const payload = { sub: user._id, username: user.name,email:user.email };

        

        return {

                access_token: await this.jwtService.signAsync(payload),
        
                // _id:user?._id,
                // name:user?.name,
                // lastname:user?.lastname,
                // birthdate:user?.birthdate,
                // phone:user?.phone,
                // email:user?.email,
                // patient:user?.patient,
                // zone:user?.patient.zone,
                // device:user?.patient.device,
                // idNumber:user?.idNumber,
                // userType:user?.userType
                
        }
    }

    async getUserFromToken(token: string): Promise<any> {
        console.log('token ')
        console.log(token)
        try {
            const decoded = this.jwtService.verify(token);
            console.log('decoded')
            console.log(decoded)
            const email = decoded.email;

            const user = await this.userService.getUserByUserEmail(email);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            return {
                access_token: token,
                _id:user?._id,
                name:user?.name,
                lastname:user?.lastname,
                birthdate:user?.birthdate,
                phone:user?.phone,
                email:user?.email,
                patient:user?.patient,
                zone:user?.patient.zone,
                device:user?.patient.device,
                idNumber:user?.idNumber,
                userType:user?.userType
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async validateToken(token: string): Promise<any> {
        return this.jwtService.verify(token);
    }
}


