import { Injectable } from '@nestjs/common';
import { CreateMessagesWebsocketDto } from './dto/create-messages-websocket.dto';
import { UpdateMessagesWebsocketDto } from './dto/update-messages-websocket.dto';

@Injectable()
export class MessagesWebsocketService {
  create(createMessagesWebsocketDto: CreateMessagesWebsocketDto) {
    return 'This action adds a new messagesWebsocket';
  }

  findAll() {
    return `This action returns all messagesWebsocket`;
  }
}
