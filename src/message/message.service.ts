import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessagesBase} from "./message.entity";
import {Repository} from "typeorm";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {GetConversationResponse, SendMessageResponse} from "../interfaces/message.interface";
import {User} from "../user/user.entity";

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(MessagesBase) private messagesBaseRepository: Repository<MessagesBase>
    ) {
    }


    async handleMessage(newMessage: SendTxtMessageDto, user: User): Promise<SendMessageResponse>
    {
        const message = new MessagesBase();
        message.messageFrom = user.id;
        message.messageTo = newMessage.messageTo;
        message.messagePayload = newMessage.messagePayload;
        await this.messagesBaseRepository.save(message);

        return {
            isSuccess: true
        };
    }

    async getConversation(ConversationId: string): Promise<GetConversationResponse>{
        return await this.messagesBaseRepository.findBy( {messageConversationId: ConversationId});
    }
}
