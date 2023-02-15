import { Injectable } from '@nestjs/common';
import { CreateMessagesWebsocketDto } from './dto/create-messages-websocket.dto';
import { UpdateMessagesWebsocketDto } from './dto/update-messages-websocket.dto';
import { MessagesWebsocket } from './entities/messages-websocket.entity';

@Injectable()
export class MessagesWebsocketService {
  messages: MessagesWebsocket[] = [{ name: 'Tom', text: 'heyy Boo' }];
  create(createMessagesWebsocketDto: CreateMessagesWebsocketDto) {
    return this.messages.push(createMessagesWebsocketDto);
  }

  findAll() {
    return `This action returns all messagesWebsocket`;
  }
}
