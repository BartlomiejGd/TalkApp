import { Module } from '@nestjs/common';
import {MessageController} from "./message.controller";
import {MessageService} from "./message.service";
import {TypeOrmModule} from "@nestjs/typeorm";
import {MessagesBase} from "./message.entity";
import {Connections} from "../connections/connections.entity";

@Module({

    imports: [
        TypeOrmModule.forFeature([MessagesBase, Connections])
    ],
    controllers: [MessageController],
    providers: [MessageService],
    exports: [MessageService],

})
export class MessageModule {


}
