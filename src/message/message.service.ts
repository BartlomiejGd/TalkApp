import { Injectable } from '@nestjs/common';
import {InjectRepository} from "@nestjs/typeorm";
import {MessagesBase} from "./message.entity";
import {Repository} from "typeorm";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {
    GetPaginatedConversationResponse,
    SendMessageResponse
} from "../interfaces/message.interface";
import {User} from "../user/user.entity";
import {Connections} from "../connections/connections.entity";
import {take} from "rxjs";
import {GetConversationDto} from "./dto/get-conversation.dto";

@Injectable()
export class MessageService {

    constructor(
        @InjectRepository(MessagesBase) private messagesBaseRepository: Repository<MessagesBase>,
        @InjectRepository(Connections) private connectionsRepository: Repository<Connections>
    ) {
    }

    //Send Message to connected user [add record to db]
    async handleMessage(newMessage: SendTxtMessageDto, user: User): Promise<SendMessageResponse>
    {
        const message = new MessagesBase();
        message.messageFrom = user.id;
        message.messageTo = newMessage.messageTo;
        message.messagePayload = newMessage.messagePayload;

        message.messageConversationId = (await this.connectionsRepository.findOne({where: [
                            {sendFrom: user.id, sendTo:message.messageTo, isAccepted :true},
                            {sendFrom:message.messageTo, sendTo:user.id, isAccepted: true}
                            ]})).id;

        await this.messagesBaseRepository.save(message);

        return {
            isSuccess: true
        };
    }

    //get conversation with pagination [by ConversationId]
    async getConversation(params: GetConversationDto): Promise<GetPaginatedConversationResponse> {

        //max item per request
        const maxPerPage = 5;

        const [messages, pagesCount] = await this.messagesBaseRepository.findAndCount({
            where: {messageConversationId: params.ConversationId}, //conditions
            skip: maxPerPage * (params.Page - 1),   //skip pages from :pages in dto
            take: maxPerPage                        //how many items should be in request
        });

        return {
            messages,
            pagesCount,
        }
    }
    }

