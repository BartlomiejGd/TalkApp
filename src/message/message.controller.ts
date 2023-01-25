import {Body, Controller, Get, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {MessageService} from "./message.service";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {
    GetPaginatedConversationResponse,
    SendMessageResponse
} from "../interfaces/message.interface";
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {SendMessageGuard} from "../guard/sendMessage.guard";
import {GetConversationDto} from "./dto/get-conversation.dto";

@Controller('message')
export class MessageController {

    constructor(
        @Inject(MessageService) private messageSevice: MessageService,
    ) {
    }

    //Send Message to connected user
    @UseGuards(AuthGuard('jwt'))
    @UseGuards(SendMessageGuard)
    @Post('/sendTxtMessage')
    async sendTxtMessage(@Body() newTxtMessage: SendTxtMessageDto,
                   @UserObj() user: User): Promise<SendMessageResponse> {
        return this.messageSevice.handleMessage(newTxtMessage, user);
    }

    //get conversation with ConversationId
    @UseGuards(AuthGuard('jwt'))
    @Get('/GetConversation/:ConversationId/:Page')
    getConversation(@Param() params: GetConversationDto): Promise<GetPaginatedConversationResponse>{
        return this.messageSevice.getConversation(params);
    }

}
