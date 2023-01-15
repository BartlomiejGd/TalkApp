import {Body, Controller, Inject, Post} from '@nestjs/common';
import {MessageService} from "./message.service";
import {SendTxtMessageDto} from "./dto/send-txt-message.dto";
import {SendMessageResponse} from "../interfaces/message.interface";

@Controller('message')
export class MessageController {

    constructor(
        @Inject(MessageService) private messageSevice: MessageService,
    ) {
    }

@Post('/sendTxtMessage')
    sendTxtMessage(@Body() newTxtMessage: SendTxtMessageDto ): Promise<SendMessageResponse> {
        return this.messageSevice.handleMessage(newTxtMessage);
}



}
