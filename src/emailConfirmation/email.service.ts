import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "../user/user.entity";
import {Repository} from "typeorm";

@Injectable()
export class EmailService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
    }


    async confirmMail(param: string): Promise<any>{

        console.log(` >>>>>>>>>>  ${param}`)

        return{
            isSucces: true
        }
    }




}
