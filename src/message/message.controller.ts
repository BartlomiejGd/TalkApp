import {Body, Controller, Inject, Post, UseGuards} from '@nestjs/common';
import {MessageService} from "./message.service";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {SendMessageResponse} from "../interfaces/message.interface";
import {AuthGuard} from "@nestjs/passport";
import {UserObj} from "../decorators/user-obj.decorator";
import {User} from "../user/user.entity";

@Controller('message')
export class MessageController {

    constructor(
        @Inject(MessageService) private messageSevice: MessageService,
    ) {
    }

    @UseGuards(AuthGuard('jwt'))
    @Post('/sendTxtMessage')
    sendTxtMessage(@Body() newTxtMessage: SendTxtMessageDto,
                   @UserObj() user: User): Promise<SendMessageResponse> {
        return this.messageSevice.handleMessage(newTxtMessage, user);
    }



}
