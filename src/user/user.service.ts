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
    ) {
    }

    //register new user >>> send confirmation email
    async registerNewUser(newUser: RegisterUserDto,): Promise<RegisterUserResponse> {

        //Check each param on server site (extend validation on server too!)
        const emailIsOkServerCheck = !(await this.userRepository.exist({where: {email: newUser.email}}))
        const nickIsOKServerCheck = !(await this.userRepository.exist({where: {nick: newUser.nick}}))
        const pwdMatchServerCheck = newUser.pwd === newUser.repwd ? true : false

        if (emailIsOkServerCheck && nickIsOKServerCheck && pwdMatchServerCheck) {
            const user = new User();
            user.email = newUser.email;
            user.pwdHash = hashPwd(newUser.pwd);
            user.nick = newUser.nick;

            await this.userRepository.save(user); //save to db
            console.log(`LOG >>>> New User has been created!`);

            await this.handleConfirmationAccount(user.email);

            return {
                emailIsOk: emailIsOkServerCheck,
                nickIsOK: nickIsOKServerCheck,
                pwdMatch: pwdMatchServerCheck,
                accountCreated: true
            }
        } else {
            return {
                emailIsOk: emailIsOkServerCheck,
                nickIsOK: nickIsOKServerCheck,
                pwdMatch: pwdMatchServerCheck,
                accountCreated: false
        }
        }
    }

     async handleConfirmationAccount(emailAdress: string): Promise<boolean>{

        //check record id to prepare confirmation email link
         const readRecord = await this.userRepository.findOne({
         where: {email : emailAdress}})

        //send confimration email
        await this.emailService.emailPayload(readRecord.id)

        return true;
    }
}






