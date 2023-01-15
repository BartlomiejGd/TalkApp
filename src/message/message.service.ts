import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessagesBase} from "./message.entity";
import {Repository} from "typeorm";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {SendMessageResponse} from "../interfaces/message.interface";

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(MessagesBase) private messagesBaseRepository: Repository<MessagesBase>
    ) {
    }


    async handleMessage(newMessage: SendTxtMessageDto): Promise<SendMessageResponse>
    {
        const message = new MessagesBase();
        message.messageFrom = newMessage.messageFrom;
        message.messageTo = newMessage.messageTo;
        message.messagePayload = newMessage.messagePayload;
        await this.messagesBaseRepository.save(message);

        return {
            isSuccess: true
        };
    }


}
