import { Injectable } from '@nestjs/common';
import { CreateMessagesWebsocketDto } from './dto/create-messages-websocket.dto';
import { UpdateMessagesWebsocketDto } from './dto/update-messages-websocket.dto';
import { MessagesWebsocket } from './entities/messages-websocket.entity';

@Injectable()
export class MessagesWebsocketService {
  messages: MessagesWebsocket[] = [{ name: 'Tom', text: 'heyy Boo' }];
  clientToUser = {};

  identify(name: string, clientId: string) {
    this.clientToUser[clientId] = name;

    return Object.values(this.clientToUser);
  }

  getClientName(clientId: string) {
    return this.clientToUser[clientId];
  }

  create(createMessagesWebsocketDto: CreateMessagesWebsocketDto) {
    const message = { ...createMessagesWebsocketDto };
    return this.messages.push(message);
  }

  findAll() {
    return `This action returns all messagesWebsocket`;
  }
}
