import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessagesBase} from "./message.entity";
import {Repository} from "typeorm";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {GetConversationResponse, SendMessageResponse} from "../interfaces/message.interface";
import {User} from "../user/user.entity";
import {Connections} from "../connections/connections.entity";

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(MessagesBase) private messagesBaseRepository: Repository<MessagesBase>,
        @InjectRepository(Connections) private connectionsRepository: Repository<Connections>
    ) {
    }

    async handleMessage(newMessage: SendTxtMessageDto, user: User): Promise<SendMessageResponse>
    {
      //  this.userAreConnected(user.id, newMessage.messageTo)

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
