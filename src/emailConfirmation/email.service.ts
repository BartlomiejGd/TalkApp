import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {Repository} from "typeorm";
import {hashPwd} from "../utility/hash";

@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }

    //////////////////////////////////
    ///      DUMMY MAIL SENDER     ///
    //////////////////////////////////
    async emailPayload(userID: string): Promise<string>{

        const payload = `To confirm your email click this link >>>> http://localhost:3000/api/v1/email/confirmation/${userID}`

        console.log(payload);
        return payload
    }

    async confirmMail(param: string): Promise<boolean>{

        const emailToAccept = await this.userRepository.findOneOrFail({
            where:{
            id: param}})

        if(!emailToAccept){
            return false;
        }

        emailToAccept.emailIsActivated = true;
        this.userRepository.save(emailToAccept);

        return true;
    }




}
