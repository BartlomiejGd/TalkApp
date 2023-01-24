import {Inject, Injectable} from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import { hashPwd } from '../utility/hash';
import {RegisterUserDto} from "./dto/user.dto";
import {RegisterUserResponse} from "../interfaces/user.interface";
import {EmailService} from "../emailConfirmation/email.service";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @Inject(EmailService) private emailService: EmailService,
    ) {}

    //register new user >>> send confirmation email
    async registerNewUser(newUser: RegisterUserDto,): Promise<RegisterUserResponse>{

        const user = new User();
        user.email = newUser.email;
        user.pwdHash = hashPwd(newUser.pwd);

        await this.userRepository.save(user); //save to db
        console.log(`LOG >>>> New User has been created!`);

        //check record id to prepare confirmation email link
        const readRecord = await this.userRepository.findOne({
            where: {email : user.email}})
        //send confimration email
        await this.emailService.emailPayload(readRecord.id)

        return{
            id: readRecord.id,
            email: readRecord.email
        }

    }


}

