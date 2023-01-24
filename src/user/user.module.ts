import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {UserController} from "./user.controller";
import {User} from "./user.entity";
import {EmailService} from "../emailConfirmation/email.service";
import {EmailModule} from "../emailConfirmation/email.module";


@Module({

  imports: [
    TypeOrmModule.forFeature([User]),
      EmailModule
  ],
  controllers: [UserController],
  providers: [UserService, EmailService],
  exports: [UserService],
})
export class UserModule {}
