import { Module } from '@nestjs/common';
import { EmailController } from './email.controller';
import { EmailService } from './email.service';
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "../user/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [EmailController],
  providers: [EmailService],
  exports: [EmailService]
})
export class EmailModule {}
