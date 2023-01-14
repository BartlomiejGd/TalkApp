import { Module } from '@nestjs/common';
import {MessageController} from "./message.controller";
import {MessageService} from "./message.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessagesBase} from "./message.entity";

@Module({

    imports: [
        TypeOrmModule.forFeature([MessagesBase])
    ],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],

})
export class MessageModule {


}
