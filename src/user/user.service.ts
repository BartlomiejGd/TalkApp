import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {User} from "./user.entity";
import {Repository} from "typeorm";
import { hashPwd } from '../utility/hash';
import {RegisterUserDto} from "./dto/user.dto";
import {RegisterUserResponse} from "../interfaces/user.interface";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {}

    async registerNewUser(
        newUser: RegisterUserDto,
    ): Promise<RegisterUserResponse> {
        const user = new User();
        user.email = newUser.email;
        user.pwdHash = hashPwd(newUser.pwd);
        console.log(`New User has been created!`);

        return await this.userRepository.save(user); //save to db

    }


}

