import {Body, Controller, Get, Inject, Param, Post, UseGuards} from '@nestjs/common';
import {MessageService} from "./message.service";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {GetConversationResponse, SendMessageResponse} from "../interfaces/message.interface";
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";
import {SendMessageGuard} from "../guard/sendMessage.guard";

@Controller('message')
export class MessageController {

    constructor(
        @Inject(MessageService) private messageSevice: MessageService,
    ) {
    }

    @UseGuards(AuthGuard('jwt'))
   // @UseGuards(SendMessageGuard)
    @Post('/sendTxtMessage')
    async sendTxtMessage(@Body() newTxtMessage: SendTxtMessageDto,
                   @UserObj() user: User): Promise<SendMessageResponse> {
        return this.messageSevice.handleMessage(newTxtMessage, user);
    }

    @UseGuards(AuthGuard('jwt'))
    @Get('/GetConversation/:ConversationId')
    getConversation(@Param('ConversationId') messageConversationId: string): Promise<GetConversationResponse>{
        return this.messageSevice.getConversation(messageConversationId);
    }

}
